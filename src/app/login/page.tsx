"use client";

import Image from "next/image";
import ktbLogo from "../../../public/images/KTB_logo.png";
import { Button } from "@/components/ui/button";
import { Tooltip } from "./components/Tooltip";
import kakaoSymbol from "../../../public/images/kakao_symbol.png";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Page() {
  const [value, setValue] = useState("");

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
        <div className="flex flex-col justify-center items-center">
          <div>
            카테부 수강생임을 확인하기 위해 인증코드를 입력해주세요!(ZEP
            비밀번호)
          </div>

          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Tooltip message="⚡️10초만에 빠른가입!⚡️">
          <Button
            className="w-[400px] h-10 bg-[#FEE500] hover:bg-[#EDD600] text-black font-normal space-x-4"
            onClick={handleKakaoLogin}
            disabled={value !== "9999"}
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
