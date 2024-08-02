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
    const [chatId, setCurrentChatId] = useState<string|null>(null);
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const chatIdMatch = pathname.match(/\/chat\/(\d+)/);
        if (chatIdMatch) {
            setCurrentChatId(chatIdMatch[1]);
        } else {
            setCurrentChatId(null);
        }
        setIsButtonDisabled(inputValue.trim() === "");
    }, [inputValue]);

    const handleSubmit = async () => {
        if (inputValue.trim() !== "") {
            console.log("Message sent:", inputValue);
            // todo
            // 만약 chatId가 null인경우 -> 새로운 채팅이라 간주?
            if (chatId === null) {
                // 채팅방 자체가 없는경우
                const createdChat = createNewChat(inputValue);
                // queryClient.getQueryData([])
                const createdChat = await createNewChat(inputValue);
                router.push(`/chat/${createdChat.chatId}`);
                await queryClient.invalidateQueries({
                    queryKey: ["getTitles"]
                })
            } else {
                // 채팅방 존재하는 경우
                console.log("[not null] Message sent:", chatId);
                const data: ChatContent[] = await sendChatMessage(chatId, inputValue);
                queryClient.setQueryData(["chatHistory", chatId], (old:ChatContent[]) => [...old, data]);
            }
            // queryClient.setQueryData('chatMessages', (old) => [...old, inputValue]);
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
