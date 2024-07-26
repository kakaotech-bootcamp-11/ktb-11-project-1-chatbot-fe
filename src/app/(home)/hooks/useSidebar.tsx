import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useSidebar = () => {
  const [chatHistory, setChatHistory] = useState([
    { id: "1", message: "Hello, how can I help you?" },
    { id: "2", message: "I need assistance with my account." },
    { id: "3", message: "Sure, what do you need help with?" },
    { id: "4", message: "I forgot my password." },
    { id: "5", message: "No problem, let's reset it." },
    { id: "6", message: "Hello, how can I help you?" },
    { id: "7", message: "I need assistance with my account." },
    { id: "8", message: "Sure, what do you need help with?" },
    { id: "9", message: "I forgot my password." },
    { id: "10", message: "No problem, let's reset it." },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

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
    chatHistory,
    currentChatId,
    addNewChatMessage,
    handleChatClick,
    handleLogOut,
  };
};
