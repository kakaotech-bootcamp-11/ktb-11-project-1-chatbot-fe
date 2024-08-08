"use client";

import { Separator } from "@/components/ui/separator";
import UserProfile from "./components/UserProfile";
import UserRecommendattion from "./components/UserRecommendation";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="relative flex flex-row h-full items-center justify-center w-full text-black border">
      {/* 프로필 */}
      <div className="flex flex-col w-1/2 h-full justify-center items-center">
        <UserProfile />
      </div>
      <Separator orientation="vertical" />
      {/* 유저 추천 문구 설정 */}
      <div className="flex flex-col w-1/2 h-full items-center">
        <UserRecommendattion />
      </div>
      <X
        onClick={() => router.back()}
        className="text-white absolute top-10 right-10 hover:bg-white hover:bg-opacity-20 rounded-full "
      />
    </div>
  );
}
