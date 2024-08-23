"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ktbBalloonLogo from "../../../../public/images/ktb_balloon_logo.jpeg";
import { LogIn, LogOut, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSidebar } from "../hooks/useSidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteChatMutation } from "../hooks/useDeleteChatMutation";
import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import useSessionErrorStore from "@/store/sessionErrorStore";
import { toast } from "sonner";

type Props = {
  session: string;
};

export default function Sidebar({ session }: Props) {
  const router = useRouter();
  const {
    isLoading,
    isFetching,
    chatTitleList,
    currentChatId,
    addNewChatMessage,
    handleChatClick,
    handleKakaoLogin,
    handleLogOut,
  } = useSidebar();

  const { sessionError } = useSessionErrorStore((state) => state);

  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);
  // const [deleteId, setDeleteId] = useState<number>(0);
  const [deleteInfo, setDeleteInfo] = useState({
    id: 0,
    title: "",
  });

  const { mutate: deleteChatMutate } = useDeleteChatMutation();

  const chatTitles = chatTitleList ?? [];

  const deleteChatMessage = (chatId: number) => {
    if (currentChatId === deleteInfo.id) {
      deleteChatMutate(chatId);
      router.push("/");
    } else {
      deleteChatMutate(chatId);
    }
  };

  if (isLoading) {
    return (
      <aside className="flex flex-col h-full py-4 space-y-2 w-[318px] max-w-[318px]">
        <header className="flex flex-row items-center space-x-3">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </header>
        <Separator />
        <Skeleton className="w-full h-15 mb-2" />
        <div className="relative h-full px-2 overflow-y-auto space-y-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-9 rounded-lg" />
          ))}
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center p-2 space-y-2">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </aside>
    );
  }

  return (
    <>
      <AlertDialog>
        <aside className="flex flex-col md:w-1/4 lg:w-1/5 h-full py-4 space-y-2 w-1/4 max-w-[260px] shadow-inner">
          <header className="flex flex-row items-center space-x-3">
            <Image
              height={40}
              width={40}
              src={ktbBalloonLogo}
              className="rounded-xl"
              style={{ width: "40px", height: "40px" }}
              alt="KTB 로고"
            />
            <div>
              <div className="font-bold">카테부 챗봇</div>
              <div>ray! 환영합니다!</div>
            </div>
          </header>
          <Separator className="bg-gray-500" />
          <button
            onClick={addNewChatMessage}
            className="w-full p-2 mb-2 text-white border border-white rounded hover:bg-white hover:text-[#0E1E46] hover:bg-muted transition-transform transform hover:scale-105"
          >
            새 채팅
          </button>
          <div className="relative h-full px-2 overflow-y-auto custom-scrollbar">
            {chatTitles.map((chat) => (
              <div
                // href={`/chat/${chat.id}`}
                key={chat.id}
                className={`p-2 cursor-pointer flex justify-between items-center rounded-lg ${
                  chat.id === currentChatId
                    ? "bg-white text-[#0E1E46]"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleChatClick(chat.id)}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <div className="overflow-hidden w-full h-full text-sm text-ellipsis whitespace-nowrap">
                  {chat.title}
                </div>
                <AlertDialogTrigger
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteInfo({
                      id: chat.id,
                      title: chat.title,
                    });
                  }}
                  className={`absolute right-4 p-2 ${
                    chat.id === currentChatId
                      ? "visible bg-white"
                      : chat.id === hoveredChatId
                      ? "visible bg-gray-700"
                      : "invisible"
                  }`}
                >
                  <Trash2 size={16} className=" hover:text-red-500" />
                </AlertDialogTrigger>
              </div>
            ))}
          </div>
          <Separator className="bg-gray-500" />
          <div className="flex flex-col items-center justify-center p-2">
            <div
              onClick={() => {
                if (sessionError) {
                  toast.error("로그인이 필요한 서비스입니다.");
                  return;
                }
                router.push("/settings");
              }}
              className="flex flex-row justify-start w-full gap-2 p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-white hover:text-gray-600"
            >
              <Settings />
              <div>설정</div>
            </div>
            <div
              onClick={() => {
                if (sessionError) {
                  handleKakaoLogin();
                } else {
                  handleLogOut();
                }
              }}
              className="flex flex-row justify-start w-full gap-2 p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-white hover:text-gray-600"
            >
              {!sessionError ? (
                <div className="flex flex-row gap-2">
                  <LogOut />
                  <div>로그아웃</div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <LogIn />
                  <div>로그인</div>
                </div>
              )}
            </div>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                채팅을 삭제하시겠습니까? <br />
                <span className="text-sm font-light">({deleteInfo.title})</span>
              </AlertDialogTitle>
              <Separator />
              <AlertDialogDescription className="py-4 text-black">
                삭제한 채팅은 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="rounded-3xl"
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteChatMessage(deleteInfo.id)}
                className="bg-red-500 rounded-3xl"
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </aside>
      </AlertDialog>
    </>
  );
}
