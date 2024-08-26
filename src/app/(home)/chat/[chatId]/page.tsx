"use client";

import Chat from "./components/Chat";
import MessageInput from "../../components/MessageInput";
import Widget from "../../components/Widget";

type Props = {
  params: { chatId: string };
};

export default function Page({ params }: Props) {
  const chatId = parseInt(params.chatId);
  // console.log(chatId);

  return (
    <div className="flex flex-row w-full h-full p-2 space-x-2">
      <main className="flex flex-col w-full gap-2 p-2 text-black bg-white rounded-2xl">
        <Chat chatId={chatId} />
        <MessageInput chatId={chatId} />
      </main>
      <div className="flex w-[500px] rounded-xl text-white justify-center items-center">
        <Widget />
      </div>
    </div>
  );
}
