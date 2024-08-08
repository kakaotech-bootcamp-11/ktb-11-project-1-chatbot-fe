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

export function useDeleteChatMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteChat"],
    mutationFn: async (chatId: number): Promise<AIResponse> => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("데이터 준비 완료");
        }, 3000);
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/me/${chatId}`,
        {
          method: "DELETE",
          credentials: "include",
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
      toast.success("삭제에 성공했습니다.");
      queryClient.invalidateQueries({ queryKey: ["titles"] });
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
    },
  });
}
