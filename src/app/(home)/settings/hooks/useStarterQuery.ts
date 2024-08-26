import { useQuery } from "@tanstack/react-query";

export interface CommentStarter {
  id: number;
  comment: string;
}

const getCommentStarter = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comment_starter`,
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
export const useCommentStarterQuery = () => {
  const recommendations = [
    { id: 1, comment: "오늘 날씨에 맞는 음식 추천해줘" },
    { id: 2, comment: "집 어떻게 가야할지 추천해줘" },
    { id: 3, comment: "가장 빠른 코딩테스트 날짜가 언제야?" },
  ];

  const chatHistory = useQuery<CommentStarter[]>({
    queryKey: ["commentStarter"],
    queryFn: () => getCommentStarter(),
    retry: 0,
  });

  if (chatHistory.isError) {
    return { data: recommendations, error: chatHistory.error };
  }

  return chatHistory;
};
