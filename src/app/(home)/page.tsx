"use client";

import InitialChat from "./components/InitialChat";
import MessageInput from "./components/MessageInput";
import Widget from "./components/Widget";
import Chat from "./chat/[chatId]/components/Chat";
import useInitialDataStore from "@/store/initialDataStore";

export default function Page() {
  const { initialData } = useInitialDataStore((state) => state);

  return (
    <div className="flex flex-row w-full h-full p-2 space-x-2">
      <main className="flex flex-col flex-grow gap-2 p-2 text-black bg-white rounded-2xl">
        {initialData.length > 0 ? <Chat chatId={0} /> : <InitialChat />}
        <MessageInput />
      </main>
      <div className="items-center justify-center hidden text-white w-96 lg:flex rounded-xl">
        <Widget />
      </div>
    </div>
  );
}
