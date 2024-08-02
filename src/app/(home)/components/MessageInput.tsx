"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {SendHorizontal} from "lucide-react";
import {useEffect, useState} from "react";
import {ChatContent, createNewChat, sendChatMessage} from "@/app/(home)/hooks/useChatQuery";
import {usePathname, useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

export default function MessageInput() {
    const [inputValue, setInputValue] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [chatId, setCurrentChatId] = useState<number|null>(null);
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const chatIdMatch = pathname.match(/\/chat\/(\d+)/);
        if (chatIdMatch) {
            setCurrentChatId(parseInt(chatIdMatch[1]));
        } else {
            setCurrentChatId(null);
        }
        setIsButtonDisabled(inputValue.trim() === "");
    }, [inputValue]);

    const handleSubmit = async () => {
        if (inputValue.trim() !== "") {
            if (chatId === null) {
                const createdChat = await createNewChat(inputValue);
                router.push(`/chat/${createdChat.chatId}`);
                await queryClient.invalidateQueries({
                    queryKey: ["getTitles"]
                })
            } else {
                queryClient.setQueryData(["chatHistory", chatId], (prev: ChatContent[]) => {
                    const newChat = {
                        chatMessageId: prev[prev.length - 1].chatMessageId + 1,
                        content: inputValue,
                        isUser: true,
                    };
                    return [...prev, newChat];
                });

                const data: ChatContent = await sendChatMessage(chatId, inputValue);
                queryClient.setQueryData(["chatHistory", chatId], (prev: ChatContent[]) => {
                    const newChat = {
                        chatMessageId: prev[prev.length - 1].chatMessageId + 1,
                        content: data.content,
                        isUser: false,
                    };
                    return [...prev, newChat];
                });
            }
            setInputValue(""); // 입력 필드 초기화
        }
    };

    return (
        <div className="relative flex h-[80px] justify-center items-center p-2">
            <Input
                className="flex h-16 p-6 rounded-full "
                placeholder="물어보고 싶은 질문을 입력해주세요!"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }}
            />
            <Button
                onClick={handleSubmit}
                className="absolute right-8 rounded-full bg-[#0E1E46] hover:bg-gray-600"
                variant="ghost"
                disabled={isButtonDisabled}
            >
                <SendHorizontal className="text-white"/>
            </Button>
        </div>
    );
}
