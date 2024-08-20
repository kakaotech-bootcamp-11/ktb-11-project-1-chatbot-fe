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
  const chatHistory = useQuery<CommentStarter[]>({
    queryKey: ["commentStarter"],
    queryFn: () => getCommentStarter(),
  });

  return chatHistory;
};
