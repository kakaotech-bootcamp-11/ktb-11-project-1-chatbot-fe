"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useChatTitleListQuery } from "@/app/(home)/hooks/useChatQuery";
import { useUserProfileQuery } from "./useUserProfileQuery";
import useModalOpenStore from "@/store/modalOpenStore";

export const useSidebar = () => {
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  // const { setIsOpen } = useModalOpenStore((state) => state);

  const {
    data: chatTitleList,
    error,
    isLoading,
    isFetching,
  } = useChatTitleListQuery();

  const { data: userProfile } = useUserProfileQuery();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const chatIdMatch = pathname.match(/\/chat\/(\d+)/);
    if (chatIdMatch) {
      setCurrentChatId(parseInt(chatIdMatch[1]));
    } else {
      setCurrentChatId(null);
    }
  }, [pathname]);

  const addNewChatMessage = () => {
    setCurrentChatId(null);
    router.push("/");
  };

  const handleChatClick = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  };

  const handleKakaoLogin = () => {
    console.log("go login");
    router.push("/login");
  };

  const handleLogOut = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/logout`;
  };

  return {
    isLoading,
    isFetching,
    chatTitleList,
    currentChatId,
    userProfile,
    addNewChatMessage,
    handleChatClick,
    handleKakaoLogin,
    handleLogOut,
  };
};
