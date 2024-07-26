"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(inputValue.trim() === "");
  }, [inputValue]);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      console.log("Message sent:", inputValue);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="relative flex h-[80px] justify-center items-center p-2">
      <Input
        className="flex h-16 p-6 rounded-full "
        placeholder="물어보고 싶은 질문을 입력해주세요!"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button
        onClick={handleSubmit}
        className="absolute right-8 rounded-full bg-[#0E1E46] hover:bg-gray-600"
        variant="ghost"
        disabled={isButtonDisabled}
      >
        <SendHorizontal className="text-white" />
      </Button>
    </div>
  );
}
