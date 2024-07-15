import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { BotMessageSquare } from "lucide-react";
import Chat from "./components/Chat";

export default function Component() {
  return (
    <div className="flex h-screen">
      <aside className="w-80 bg-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">새로운 채팅</h2>
          <Plus className="w-6 h-6" />
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 py-2 w-full"
          />
        </div>
        <div className="flex items-center p-2 bg-gray-200 rounded-md">
          {/* <BotMessageSquare className="w-6 h-6" /> */}
          <span className="ml-2">matrix_trinity:latest</span>
        </div>
      </aside>
      <main className="flex flex-col w-full p-10">
        <div className="w-full p-4 text-3xl font-bold">카테부 챗봇</div>
        <div className="flex flex-col w-full h-full p-2">
          <Chat />
        </div>
        <div className="flex h-[100px] justify-center items-center p-2">
          <Input
            className="flex h-16 rounded-full p-6"
            placeholder="Type your message..."
          />
        </div>
      </main>
    </div>
  );
}
