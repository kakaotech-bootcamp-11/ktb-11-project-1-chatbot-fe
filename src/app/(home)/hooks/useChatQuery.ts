import useInitialDataStore from "@/store/initialDataStore";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export interface ChatTitle {
  id: number;
  title: string;
}

export interface ChatContent {
  isUser: boolean;
  chatMessageId: number;
  content: string;
}

const fetchChatTitles = async (): Promise<ChatTitle[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/me/titles`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ChatTitle[] = await response.json();
  return data || [];
};
export const useChatTileListQuery = () => {
  const { setSessionError } = useSessionErrorStore((state) => state);

  const titles = useQuery<ChatTitle[]>({
    queryKey: ["titles"],
    queryFn: () => fetchChatTitles(),
    retry: 1,
    select: (data) => data ?? [],
  });

  useEffect(() => {
    if (titles.error) {
      setSessionError(true);
      // toast.error("로그인을 먼저 해야 합니다.");
    }
  }, [titles.error, setSessionError]);

  useEffect(() => {
    if (titles.isSuccess) {
      setSessionError(false);
    }
  }, [titles.isSuccess, setSessionError]);

  return titles;
};

const getChatHistory = async (chatId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/me/${chatId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const useChatHistoryQuery = (chatId: number) => {
  const router = useRouter();

  const { initialData } = useInitialDataStore((state) => state);

  const chatHistory = useQuery<ChatContent[]>({
    queryKey: ["chatHistory", chatId],
    queryFn: () => getChatHistory(chatId),
    enabled: !!chatId, // initialData가 없을 때만 쿼리 실행
    retry: 0,
  });

  useEffect(() => {
    if (chatHistory.error) {
      router.push("/");
      toast.error("해당 대화방에 참가할 수 없습니다.");
    }
  }, [chatHistory.error, router]);

  return chatHistory;
};
