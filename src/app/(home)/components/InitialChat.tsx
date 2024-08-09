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

export default function InitialChat() {
  const [basicMessages, setBasicMessages] = useState([
    "오늘 날씨에 맞는 음식 추천해줘",
    "집 어떻게 가야할지 추천해줘",
    "가장 빠른 코딩테스트 날짜가 언제야?",
  ]);
  const { mutate } = useCreateNewChatMutation();
  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );
  const { sessionError } = useSessionErrorStore((state) => state);

  const handleMessageSubmmit = (message: string) => {
    if (!sessionError) {
      // setIsChatLoading(true);
      mutate(message);
      // setIsChatLoading(false);
    } else {
      toast.error("로그인이 필요한 서비스입니다.");
    }
  };

  if (isChatLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      {/* <Image width={200} height={200} src={lionImage} alt="lion" priority /> */}
      <Image width={200} height={200} src={ryan} alt="ryan" priority />
      <div className="text-lg">
        카카오테크 부트캠프 챗봇에 오신 것을 환영합니다!
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[0]);
          }}
          className="flex items-center justify-center h-full p-4 text-center border rounded-lg cursor-pointer hover:bg-muted"
        >
          {basicMessages[0]}
        </div>
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[1]);
          }}
          className="flex items-center justify-center h-full p-4 text-center border rounded-lg cursor-pointer hover:bg-muted"
        >
          {basicMessages[1]}
        </div>
        <div
          onClick={() => {
            handleMessageSubmmit(basicMessages[2]);
          }}
          className="flex items-center justify-center h-full p-4 text-center border rounded-lg cursor-pointer hover:bg-muted"
        >
          {basicMessages[2]}
        </div>
      </div>
    </div>
  );
}
