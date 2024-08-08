"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChatContent } from "@/app/(home)/hooks/useChatQuery";
import { Skeleton } from "@/components/ui/skeleton";
import useInitialDataStore from "@/store/initialDataStore";
import Loading from "@/app/components/loading";
import CursorLoading from "../chat/[chatId]/components/CursorLoading";

export default function InitialLoadingChat() {
  const { initialData } = useInitialDataStore((state) => state);

  return (
    <div className="flex w-full h-full p-4 overflow-auto">
      <div className="w-full h-full space-y-4">
        {initialData.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.isUser ? "justify-end" : ""
            }`}
          >
            {!message.isUser && (
              <Avatar className="flex-shrink-0 w-8 h-8 border">
                <AvatarFallback>JD</AvatarFallback>
                <AvatarImage src="/images/ktb_balloon_logo.jpeg" />
              </Avatar>
            )}
            {message.content === "" ? (
              <div className="bg-muted max-w-[75%] p-4 rounded-lg">
                {/* <Skeleton className="h-4 w-[200px]" /> */}
                <CursorLoading />
              </div>
            ) : (
              <div
                className={`rounded-lg p-4 max-w-[75%] ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground text-[#0E1E46]"
                }`}
              >
                {message.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
