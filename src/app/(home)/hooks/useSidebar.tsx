"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useChatTileListQuery} from "@/app/(home)/hooks/useChatQuery";

export const useSidebar = () => {
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const {data: chatTitleList, error, isLoading}  = useChatTileListQuery();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const chatIdMatch = pathname.match(/\/chat\/(\d+)/);
        if (chatIdMatch) {
            setCurrentChatId(chatIdMatch[1]);
        } else {
            setCurrentChatId(null);
        }
    }, [pathname]);

    const addNewChatMessage = () => {
        setCurrentChatId(null);
        router.push("/");
    };

    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    const handleLogOut = async () => {
        window.location.href = "http://localhost:8080/oauth2/logout";
    };

    return {
        chatTitleList,
        currentChatId,
        addNewChatMessage,
        handleChatClick,
        handleLogOut,
    };
};
