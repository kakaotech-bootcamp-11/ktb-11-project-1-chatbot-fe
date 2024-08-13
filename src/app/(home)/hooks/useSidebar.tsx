"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useChatTileListQuery } from "@/app/(home)/hooks/useChatQuery";

export const useSidebar = () => {
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const {
    data: chatTitleList,
    error,
    isLoading,
    isFetching,
  } = useChatTileListQuery();

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
    isFetching,
    chatTitleList,
    currentChatId,
    addNewChatMessage,
    handleChatClick,
    handleKakaoLogin,
    handleLogOut,
  };
};
