import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSkeletonStore from "@/store/skeletonStore";
import { toast } from "sonner";
import { ChatContent } from "./useChatQuery";

export interface CreatedChat {
  chatId: number;
  aiResponse: AIResponse;
}

export interface AIResponse {
  chatMessageId: number;
  content: string;
  isUser: boolean;
}

type Props = {
  message: string;
};

export function useSendChatStreamMutation(
  chatId: number | undefined,
  chatIndex: number | undefined
) {
  const queryClient = useQueryClient();
  const { setIsChatLoading } = useSkeletonStore((state) => state);

  return useMutation({
    mutationKey: ["sendChat"],
    mutationFn: async ({ message }: Props): Promise<void> => {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponse: AIResponse = {
        chatMessageId: Date.now(), // Temporary ID, could be replaced with a proper ID
        content: "",
        isUser: false,
      };

      while (!done) {
        const { value, done: streamDone } = (await reader?.read()) ?? {};
        done = streamDone!;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk.trim() !== "") {
          const jsonChunks = chunk
            .split("\n\n")
            .filter((c) => c.startsWith("data: "));
          console.log(jsonChunks);

          for (const jsonChunk of jsonChunks) {
            const jsonStr = jsonChunk.replace("data: ", "");
            if (jsonStr === "[DONE]") {
              done = true;
              break;
            }

            try {
              const json = JSON.parse(jsonStr);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                aiResponse.content += content;

                // Update the query data as the response streams in
                queryClient.setQueryData(
                  ["chatHistory", chatId],
                  (prev: ChatContent[]) => {
                    const updatedChat = [...(prev || [])];
                    updatedChat[chatIndex as number] = {
                      ...aiResponse,
                    };
                    return updatedChat;
                  }
                );
              }
            } catch (error) {
              console.error("Failed to parse chunk:", error);
            }
          }
        }
      }
    },
    onSuccess: () => {
      setIsChatLoading(false);
    },
    onError: () => {
      setIsChatLoading(false);
      toast.error("잘못된 요청입니다.");
    },
  });
}
