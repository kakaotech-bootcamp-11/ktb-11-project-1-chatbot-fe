import useInitialDataStore from "@/store/initialDataStore";
import useSkeletonStore from "@/store/skeletonStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChatContent } from "./useChatQuery";
import { toast } from "sonner";

export interface CreatedChat {
  chatId: number;
  aiResponse: AIResponse;
}

export interface AIResponse {
  chatMessageId: number;
  content: string;
  isUser: boolean;
}

export function useCreateNewChatStreamMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );
  const { setInitialData, resetInitialData, addInitialData } =
    useInitialDataStore((state) => state);

  return useMutation({
    mutationKey: ["createNewChat"],
    mutationFn: async (content: string): Promise<CreatedChat> => {
      setIsChatLoading(true);

      // Add initial user message
      addInitialData({
        chatMessageId: 0,
        content,
        isUser: true,
      });

      // Placeholder for the AI response while streaming
      addInitialData({
        chatMessageId: 1,
        content: "",
        isUser: false,
      });

      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponse: AIResponse = {
        chatMessageId: Date.now(), // Temporary ID for AI response
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

                // Update local state (initial data store) as the response streams in
                setInitialData(1, {
                  ...aiResponse,
                });
              }
            } catch (error) {
              console.error("Failed to parse chunk:", error);
            }
          }
        }
      }

      console.log("끝");

      // Simulate creating a new chat and return the chatId
      // In a real scenario, this would be an API call to create the chat and get the chatId
      const createdChat: CreatedChat = {
        chatId: Date.now(), // Simulating a new chatId
        aiResponse: aiResponse,
      };

      return createdChat;
    },
    onSuccess: async (data, variables, context) => {
      console.log(data);
      // Invalidate and refetch any related queries
      await queryClient.invalidateQueries({
        queryKey: ["titles"],
      });

      // setIsChatLoading(false);

      // Redirect to the new chat page
      // router.push(`/chat/${data.chatId}`);

      // Simulate a delay for final processing or UI update
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset the initial data store
      resetInitialData();

      // Set loading state to false
      // setIsChatLoading(false);
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
      setIsChatLoading(false);
    },
  });
}
