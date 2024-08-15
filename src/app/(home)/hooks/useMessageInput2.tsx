"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChatContent,
  useChatTileListQuery,
} from "@/app/(home)/hooks/useChatQuery";
import { useCreateNewChatMutation } from "./useCreateNewChatMutation";
import { useSendChatStreamMutation } from "./useSendChatStreamMutation";
import useSkeletonStore from "@/store/skeletonStore";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateNewChatStreamMutation } from "./useCreateNewChatStreamMutation";

export const useMessageInput2 = (chatId: number) => {
  const [inputValue, setInputValue] = useState("");
  const [chatIndex, setChatIndex] = useState<number>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const { mutate } = useCreateNewChatMutation();
  const { mutate } = useCreateNewChatStreamMutation();
  const { mutate: sendMutate } = useSendChatStreamMutation(chatId, chatIndex);

  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );
  const { sessionError } = useSessionErrorStore((state) => state);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (sessionError) {
      toast.error("로그인이 필요한 서비스입니다.");
      return;
    }

    if (inputValue.trim() === "") return;

    if (!chatId) {
      // 새 채팅
      mutate(inputValue);
    } else {
      // 기존 채팅방
      try {
        queryClient.setQueryData(
          ["chatHistory", chatId],
          (prev: ChatContent[]) => {
            setChatIndex(prev.length);
            const newChat = {
              chatMessageId: prev[prev.length - 1].chatMessageId + 1,
              content: inputValue,
              isUser: true,
            };
            return [...prev, newChat];
          }
        );
        // setIsChatLoading(true);

        // Send the message to the server and handle the streaming response
        // sendMutate({ message: inputValue });
      } catch {
        toast.error("잘못된 요청입니다.");
      }
    }

    setInputValue(""); // 입력 필드 초기화
  };

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the new scrollHeight correctly
      textareaRef.current.style.height = "auto";
      const height = textareaRef.current.scrollHeight;
      if (height <= 242) {
        textareaRef.current.style.height = height + "px";
      } else {
        textareaRef.current.style.height = "242px";
      }
    }
  }, [inputValue]);

  return {
    handleSubmit,
    textareaRef,
    inputValue,
    setInputValue,
  };
};
