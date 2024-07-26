"use client";

import Chat from "./components/Chat";
import MessageInput from "../../components/MessageInput";

export default function Page() {
  return (
    <div className="flex flex-row p-2 space-x-2">
      <main className="flex flex-col w-full p-2 text-black bg-white rounded-2xl">
        <Chat />
        <MessageInput />
      </main>
      <div className="flex w-[500px] border border-white rounded-xl text-white justify-center items-center">
        위젯
      </div>
    </div>
  );
}
