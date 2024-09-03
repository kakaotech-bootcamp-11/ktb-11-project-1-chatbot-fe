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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/me/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
        credentials: "include",
      }).then((response) => {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        let aiResponse: AIResponse = {
          chatMessageId: Date.now(), // Temporary ID, could be replaced with a proper ID
          content: "",
          isUser: false,
        };
        return reader.read().then(function process({ done, value }): any {
          if (done) {
            return;
          }

          buffer += decoder.decode(value, { stream: true });

          // 이벤트 데이터를 처리
          let lines = buffer.split("\n");
          for (let i = 0; i < lines.length - 1; i++) {
            const jsonStr = lines[i].replace("data:", "");
            if (jsonStr.trim() !== "") {
              try {
                const { type, chatId, content } =
                  JSON.parse(jsonStr).aiResponse;

                if (type === "DONE") {
                  done = true;
                  break;
                }
                aiResponse.content += content;
                queryClient.setQueryData(
                  ["chatHistory", chatId],
                  (prev: ChatContent[]) => {
                    const updatedChat = [...(prev || [])];
                    updatedChat[chatIndex as number] = {
                      ...aiResponse,
                      isUser: false,
                    };
                    return updatedChat;
                  }
                );
              } catch (error) {
                console.error("Failed to parse chunk:", error);
              }
            }
          }

          // 남은 부분을 buffer에 유지
          buffer = lines[lines.length - 1];

          return reader.read().then(process);
        });
      });
      setIsChatLoading(false);
    },
    onSuccess: () => {},
    onError: () => {
      setIsChatLoading(false);
      toast.error("잘못된 요청입니다.");
    },
  });
}
