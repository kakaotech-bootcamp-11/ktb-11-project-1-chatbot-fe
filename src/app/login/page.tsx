"use client";

import Image from "next/image";
import ktbLogo from "../../../public/images/KTB_logo.png";
import { Button } from "@/components/ui/button";
import { Tooltip } from "./components/Tooltip";
import kakaoSymbol from "../../../public/images/kakao_symbol.png";

export default function Page() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="bg-[#0E1E46] h-screen flex items-center justify-center">
      <div className="flex flex-col w-[600px] h-[400px] justify-around items-center bg-white p-8 rounded-2xl text-center">
        <Image
          width={200}
          height={200}
          src={ktbLogo}
          alt="Kakao Icon"
          priority
          style={{ height: "auto", width: "auto" }}
        />
        <Tooltip message="⚡️10초만에 빠른가입!⚡️">
          <Button
            className="w-[400px] h-10 bg-[#FEE500] hover:bg-[#EDD600] text-black font-normal space-x-4"
            onClick={handleKakaoLogin}
          >
            <Image
              width={20}
              height={20}
              src={kakaoSymbol}
              alt="카카오 심볼"
              style={{ height: 20, width: "auto" }}
            />
            <div>카카오로 시작하기</div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
