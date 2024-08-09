"use client";

import useSkeletonStore from "@/store/skeletonStore";
import InitialChat from "./components/InitialChat";
import MessageInput from "./components/MessageInput";
import InitialLoadingChat from "./components/InitialLoadingChat";
import { useState } from "react";
import Widget from "./components/Widget";

export default function Page() {
  const { isChatLoading, setIsChatLoading } = useSkeletonStore(
    (state) => state
  );

  return (
    <div className="flex flex-row w-full h-full p-2 space-x-2">
      <main className="flex flex-col w-full gap-2 p-2 text-black bg-white rounded-2xl">
        {/* <InitialChat /> */}
        {isChatLoading ? <InitialLoadingChat /> : <InitialChat />}
        <MessageInput />
      </main>
      <div className="flex w-[500px] rounded-xl text-white justify-center items-center">
        <Widget />
      </div>
    </div>
  );
}
