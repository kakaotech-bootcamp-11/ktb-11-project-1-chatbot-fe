"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatContent } from "@/app/(home)/hooks/useChatQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateNewChatMutation } from "../hooks/useCreateNewChatMutation";
import useSkeletonStore from "@/store/skeletonStore";
import { Textarea } from "@/components/ui/textarea";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";
import { useSendChatMutation } from "../hooks/useSendChatMutation";

type Props = {
  chatId?: number;
};

export default function MessageInput({ chatId }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [chatIndex, setChatIndex] = useState<number>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate } = useCreateNewChatMutation();
  const { mutate: sendMutate } = useSendChatMutation(chatId, chatIndex);
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

    if (inputValue.trim() == "") return;
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
        setIsChatLoading(true);
        queryClient.setQueryData(
          ["chatHistory", chatId],
          (prev: ChatContent[]) => {
            setChatIndex(prev.length);
            const newChat = {
              chatMessageId: prev[prev.length - 1].chatMessageId + 1,
              content: "",
              isUser: false,
            };
            return [...prev, newChat];
          }
        );
        sendMutate({ message: inputValue });
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

  return (
    <div className="flex flex-row bg-[#f4f4f4] items-center justify-center flex-1 w-full gap-2 min-w-0 p-2 border rounded-3xl">
      <textarea
        ref={textareaRef}
        rows={1}
        dir="auto"
        className="m-0 p-1 pl-4 placeholder:text-[#9B9B9B] resize-none w-full h-full bg-transparent outline-none max-h-52 overflow-y-auto"
        placeholder="물어보고 싶은 질문을 입력해주세요!"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e: any) => {
          if (e.isComposing || e.keyCode === 229) return;
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex items-end h-full justify-center">
        <ArrowUp
          onClick={handleSubmit}
          className={`text-white rounded-full w-8 h-8 p-1 ${
            inputValue ? "bg-[#0E1E46]" : "bg-gray-200"
          }  hover:bg-gray-500 items-center justify-center`}
        />
      </div>
    </div>
  );
}
