import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommentStarter } from "./useStarterQuery";
import { Dispatch, SetStateAction } from "react";

interface Address {
  address: string;
  zipNo: string;
  addrDetail: string;
}

type Props = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export function useAddressMutation({ setIsEditing }: Props) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addressUpdate"],
    mutationFn: async (addressInfo: Address): Promise<any> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/setting/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(addressInfo),
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
      await queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      toast.success("주소 업데이트에 성공했습니다.", {
        position: "bottom-right",
      });
      setIsEditing(false);
    },
    onError: (error, variables, context) => {
      toast.error("잘못된 요청입니다.");
    },
  });
}
