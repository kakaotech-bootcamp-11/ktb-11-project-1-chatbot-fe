"use client";

import Image from "next/image";
import chunsik from "../../../../public/images/sdf.gif";
import ryan from "../../../../public/images/ryan.png";
import { useCreateNewChatMutation } from "../hooks/useCreateNewChatMutation";
import { useState } from "react";
import useSkeletonStore from "@/store/skeletonStore";
import Loading from "@/app/components/loading";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";
import { useCreateNewChatStreamMutation } from "../hooks/useCreateNewChatStreamMutation";

export default function InitialChat() {
  const [basicMessages, setBasicMessages] = useState([
    "오늘 날씨에 맞는 음식 추천해줘",
    "집 어떻게 가야할지 추천해줘",
    "가장 빠른 코딩테스트 날짜가 언제야?",
  ]);
  // const { mutate } = useCreateNewChatMutation();
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
    "flex items-center justify-center w-[160px] shadow-lg text-gray-500 text-balance h-full p-4 text-center border rounded-lg cursor-pointer hover:bg-muted";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      {/* <Image width={200} height={200} src={lionImage} alt="lion" priority /> */}
      <Image
        className="drop-shadow-3xl"
        style={{ width: "auto", height: "auto" }}
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
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[0]);
          }}
          className={messageBoxStyle}
        >
          {basicMessages[0]}
        </div>
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[1]);
          }}
          className={messageBoxStyle}
        >
          {basicMessages[1]}
        </div>
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[2]);
          }}
          className={messageBoxStyle}
        >
          {basicMessages[2]}
        </div>
      </div>
    </div>
  );
}
