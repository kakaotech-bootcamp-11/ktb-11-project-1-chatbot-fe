"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { ChatContent } from "@/app/(home)/hooks/useChatQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateNewChatMutation } from "../hooks/useCreateNewChatMutation";
import { useSendChatMutation } from "../hooks/useSendChatMutation";
import useSkeletonStore from "@/store/skeletonStore";
import { Textarea } from "@/components/ui/textarea";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";

type Props = {
  chatId?: number;
};

export default function MessageInput({ chatId }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [chatIndex, setChatIndex] = useState<number>();

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

  return (
    <div className="relative flex h-[80px] justify-center items-center p-2">
      <Input
        className="flex items-center justify-center h-full pl-6 rounded-full "
        placeholder="물어보고 싶은 질문을 입력해주세요!"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e: any) => {
          if (e.isComposing || e.keyCode === 229) return;
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <ArrowUp
        onClick={handleSubmit}
        className={`text-white absolute right-8 rounded-full w-8 h-8 p-1 ${
          inputValue ? "bg-[#0E1E46]" : "bg-gray-500"
        }  hover:bg-gray-500 items-center justify-center`}
      />
      {/* <Button
        onClick={handleSubmit}
        className="absolute right-8 rounded-full w-8 h-8 bg-[#0E1E46] hover:bg-gray-600 items-center justify-center"
        variant="outline"
        disabled={!inputValue}
      >
        <SendHorizontal className="text-white " />
      </Button> */}
    </div>
  );
}
