"use client";

import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import ktbBalloonLogo from "../../../../public/images/ktb_balloon_logo.jpeg";
import {LogOut, Settings} from "lucide-react";
import {useRouter} from "next/navigation";
import {useSidebar} from "../hooks/useSidebar";

export default function Sidebar() {
    const router = useRouter();
    const {
        chatTitleList,
        currentChatId,
        addNewChatMessage,
        handleChatClick,
        handleLogOut,
    } = useSidebar();
    const currentChatIdInt = currentChatId != null ? parseInt(currentChatId, 10) : null;
    const sideBarChatTitleList = chatTitleList ?? []

    return (
        <aside className="flex flex-col h-full py-4 px-2 space-y-2 w-[350px]">
            <header className="flex flex-row items-center space-x-3 ">
                <Image height={50} width={50} src={ktbBalloonLogo} alt="KTB 로고"/>
                <div>
                    <div className="font-bold">카테부 챗봇</div>
                    <div>환영합니다! 00님!</div>
                </div>
            </header>
            <Separator/>
            <button
                onClick={addNewChatMessage}
                className="w-full p-2 mb-2 text-white border border-white rounded hover:bg-white hover:text-[#0E1E46]"
            >
                새 채팅
            </button>
            <div className="relative h-full px-2 overflow-y-auto">
                {sideBarChatTitleList.map((chat) => (
                    <div
                        key={chat.id}
                        className={`py-2 px-4 cursor-pointer rounded-lg ${
                            chat.id === currentChatIdInt 
                                ? "bg-white text-[#0E1E46]"
                                : "hover:bg-gray-700"
                        }`}
                        onClick={() => handleChatClick(String(chat.id))}
                    >
                        {chat.title}
                    </div>
                ))}
            </div>
            <Separator/>
            <div className="flex flex-col items-center justify-center p-2">
                <div
                    onClick={() => {
                        router.push("/settings");
                    }}
                    className="flex flex-row justify-start w-full gap-2 p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-white hover:text-gray-600"
                >
                    <Settings/>
                    <div>설정</div>
                </div>
                <div
                    onClick={handleLogOut}
                    className="flex flex-row justify-start w-full gap-2 p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-white hover:text-gray-600"
                >
                    <LogOut/>
                    <div>로그아웃</div>
                    {/* {session ? (
            <div className="flex flex-row gap-2">
              <LogOut />
              <div>로그아웃</div>
            </div>
          ) : (
            <div className="flex flex-row gap-2" onClick={handleLogIn}>
              <LogIn />
              <div>로그인</div>
            </div>
          )} */}
                </div>
            </div>
        </aside>
    );
}
