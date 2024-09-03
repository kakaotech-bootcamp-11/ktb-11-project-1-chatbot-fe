"use client";

import Chat from "./components/Chat";
import MessageInput from "../../components/MessageInput";
import Widget from "../../components/Widget";

type Props = {
  params: { chatId: string };
};

export default function Page({ params }: Props) {
  const chatId = parseInt(params.chatId);

  return (
    <div className="flex flex-row w-full h-full p-2 space-x-2">
      <main className="flex flex-col flex-grow gap-2 p-2 text-black bg-white rounded-2xl">
        <Chat chatId={chatId} />
        <MessageInput chatId={chatId} />
      </main>
      <div className="items-center justify-center hidden text-white w-96 lg:flex rounded-xl">
        <Widget />
      </div>
    </div>
  );
}
