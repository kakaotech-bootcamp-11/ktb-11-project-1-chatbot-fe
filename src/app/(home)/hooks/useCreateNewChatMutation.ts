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

export function useCreateNewChatMutation() {
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
      addInitialData({
        chatMessageId: 0,
        content,
        isUser: true,
      });
      addInitialData({
        chatMessageId: 1,
        content: "",
        isUser: false,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/me/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: content,
          }),
        }
      );
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("데이터 준비 완료");
        }, 3000);
      });
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
      console.log(data);
      setInitialData(1, {
        chatMessageId: 1,
        isUser: false,
        content: data.aiResponse.content,
      });
      await queryClient.invalidateQueries({
        queryKey: ["titles"],
      });
      router.push(`/chat/${data.chatId}`);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("데이터 준비 완료");
        }, 1000);
      });
      resetInitialData();
      setIsChatLoading(false);
    },
    onError: (error, variables, context) => {
      resetInitialData();
      setIsChatLoading(false);
      toast.error("잘못된 요청입니다.");
    },
  });
}
