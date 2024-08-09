"use client";

import { Separator } from "@/components/ui/separator";
import UserProfile from "./components/UserProfile";
import UserRecommendattion from "./components/UserRecommendation";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="relative flex flex-row items-center justify-center w-full h-full text-black">
      {/* 프로필 */}
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        <UserProfile />
      </div>
      <Separator orientation="vertical" className="bg-gray-500" />
      {/* 유저 추천 문구 설정 */}
      <div className="flex flex-col items-center w-1/2 h-full">
        <UserRecommendattion />
      </div>
      <X
        onClick={() => router.back()}
        className="absolute text-white rounded-full top-10 right-10 hover:bg-white hover:bg-opacity-20 "
      />
    </div>
  );
}
