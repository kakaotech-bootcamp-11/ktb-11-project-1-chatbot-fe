import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChatContent } from "./useChatQuery";
import useSkeletonStore from "@/store/skeletonStore";
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

type Props = {
  message: string;
  // chatIndex: number;
};

export function useSendChatMutation(
  chatId: number | undefined,
  chatIndex: number | undefined
) {
  const queryClient = useQueryClient();
  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );

  return useMutation({
    mutationKey: ["sendChat"],
    mutationFn: async ({ message }: Props): Promise<AIResponse> => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("데이터 준비 완료");
        }, 3000);
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/me/${chatId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: message,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData(
        ["chatHistory", chatId],
        (prev: ChatContent[]) => {
          const updatedChat = [...prev];
          updatedChat[chatIndex as number] = {
            isUser: false,
            chatMessageId: data.chatMessageId,
            content: data.content,
          };
          return updatedChat;
        }
      );
      setIsChatLoading(false);
    },
    onError: (error, variables, context) => {
      // window.location.reload();
      setIsChatLoading(false);
      toast.error("잘못된 요청입니다.");
    },
  });
}
