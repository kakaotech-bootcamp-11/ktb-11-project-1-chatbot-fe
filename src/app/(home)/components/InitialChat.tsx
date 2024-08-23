"use client";

import Image from "next/image";
import ryan from "../../../../public/images/ryan.png";
import { useCreateNewChatMutation } from "../hooks/useCreateNewChatMutation";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";
import { useCommentStarterQuery } from "../settings/hooks/useStarterQuery";
import { useState } from "react";

export default function InitialChat() {
  const { data: basicMessages } = useCommentStarterQuery(); // isLoading 추가

  const { mutate } = useCreateNewChatMutation();
  const { sessionError } = useSessionErrorStore((state) => state);

  const handleMessageSubmmit = (message: string) => {
    if (!sessionError) {
      mutate(message);
    } else {
      toast.error("로그인이 필요한 서비스입니다.");
    }
  };

  const messageBoxStyle =
    "flex items-center justify-center w-[160px] shadow-lg text-gray-500 text-balance h-full p-4 text-center border rounded-lg cursor-pointer hover:bg-muted transition-transform transform hover:scale-105";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      <Image
        className="drop-shadow-3xl transition-transform transform hover:scale-105"
        style={{
          width: "auto",
          height: "auto",
        }}
        width={150}
        height={150}
        src={ryan}
        alt="ryan"
        priority
      />
      <div className="text-lg">
        카카오테크 부트캠프 챗봇에 오신 것을 환영합니다!
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        {!basicMessages ? (
          // 로딩 중일 때 스켈레톤 UI 표시
          <>
            <div className="w-[160px] h-[80px] p-4 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-[160px] h-[80px] p-4 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-[160px] h-[80px] p-4 bg-gray-200 rounded-lg animate-pulse"></div>
          </>
        ) : (
          // 데이터가 로드된 후 메시지 표시
          <>
            <div
              onClick={() => {
                handleMessageSubmmit(basicMessages[0].comment);
              }}
              className={messageBoxStyle}
            >
              {basicMessages[0].comment}
            </div>
            <div
              onClick={() => {
                handleMessageSubmmit(basicMessages[1].comment);
              }}
              className={messageBoxStyle}
            >
              {basicMessages[1].comment}
            </div>
            <div
              onClick={() => {
                handleMessageSubmmit(basicMessages[2].comment);
              }}
              className={messageBoxStyle}
            >
              {basicMessages[2].comment}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
