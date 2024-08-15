"use client";

import { ArrowUp } from "lucide-react";
import { useMessageInput2 } from "../hooks/useMessageInput2";

type Props = {
  chatId?: number;
};

export default function MessageInput({ chatId }: Props) {
  const { handleSubmit, textareaRef, inputValue, setInputValue } =
    useMessageInput2(chatId as number);

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
          } hover:bg-gray-500 items-center justify-center cursor-pointer`}
        />
      </div>
    </div>
  );
}
