import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommentStarter } from "./useStarterQuery";

export function useCommentStarterMutation() {
  return useMutation({
    mutationKey: ["commentStarterMutation"],
    mutationFn: async (commentStarters: CommentStarter[]): Promise<any> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment_starter`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(commentStarters),
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
      toast.success("업데이트에 성공했습니다.", { position: "bottom-right" });
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
    },
  });
}
