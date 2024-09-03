"use client";

import Image from "next/image";
import ryan from "../../../../public/images/ryan.png";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";
import { useCommentStarterQuery } from "../settings/hooks/useStarterQuery";
import { MouseEvent, useState } from "react";
import { useCreateNewChatStreamMutation } from "../hooks/useCreateNewChatStreamMutation";

export default function InitialChat() {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;

    // 화면의 가운데를 기준으로 상대적인 좌표 계산
    const rotateY = ((x / width) * 2 - 1) * 20; // X축 위치를 기준으로 회전 각도 계산
    const rotateX = -((y / height) * 2 - 1) * 20; // Y축 위치를 기준으로 회전 각도 계산

    setStyle({
      transform: `perspective(250px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseOut = () => {
    setStyle({
      transform: "perspective(250px) rotateY(0deg) rotateX(0deg)",
    });
  };

  const { data: basicMessages } = useCommentStarterQuery();

  // const { mutate } = useCreateNewChatMutation();
  const { mutate } = useCreateNewChatStreamMutation();
  const { sessionError } = useSessionErrorStore((state) => state);

  const handleMessageSubmmit = (message: string) => {
    if (!sessionError) {
      mutate(message);
    } else {
      toast.error("로그인이 필요한 서비스입니다.");
    }
  };

  const messageBoxStyle =
    "flex items-center justify-center w-[160px] shadow-lg text-gray-500 text-balance h-full p-4 \
    text-center border rounded-lg cursor-pointer hover:bg-muted transition-transform transform hover:scale-105";

  return (
    <div
      // onMouseMove={handleMouseMove}
      // onMouseOut={handleMouseOut}
      className="flex flex-col items-center justify-center w-full h-full space-y-2"
    >
      <Image
        className="transition-transform transform drop-shadow-3xl hover:scale-105"
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
      {/* <div
        className="relative w-52 h-52 transition-transform duration-0"
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        style={style}
      >
        <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-yellow-400/80 to-purple-500/60 bg-[150%_150%] bg-[105deg] opacity-80 mix-blend-color-dodge transition-all"></div>
        <Image
          className="object-cover"
          src={ryan}
          alt="ryan"
          layout="fill"
          priority
        />
      </div> */}
      <div className="text-lg">
        카카오테크 부트캠프 챗봇에 오신 것을 환영합니다!
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
