"use client";

import InitialChat from "./components/InitialChat";
import MessageInput from "./components/MessageInput";
import Widget from "./components/Widget";
import Chat from "./chat/[chatId]/components/Chat";
import useInitialDataStore from "@/store/initialDataStore";

export default function Page() {
  const { initialData } = useInitialDataStore((state) => state);

  return (
    <div className="flex flex-row  w-full h-full p-2 space-x-2">
      <main className="flex flex-col w-full gap-2 p-2 text-black bg-white rounded-2xl shadow-2xl">
        {initialData.length > 0 ? <Chat chatId={0} /> : <InitialChat />}
        <MessageInput />
      </main>
      <div className="hidden lg:flex w-full lg:w-[500px] mt-4 lg:mt-0 rounded-xl text-white justify-center items-center">
        <Widget />
      </div>
    </div>
  );
}
