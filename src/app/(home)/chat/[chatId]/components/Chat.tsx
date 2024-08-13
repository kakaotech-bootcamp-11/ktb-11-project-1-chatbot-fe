"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

import { CodeBlock } from "./CodeBlock";
import { useChatHistoryQuery } from "@/app/(home)/hooks/useChatQuery";
import Loading from "@/app/components/loading";
import { useEffect, useRef } from "react";
import CursorLoading from "./CursorLoading";

type Props = {
  chatId: number;
};

export default function Chat({ chatId }: Props) {
  const { data, error, isLoading } = useChatHistoryQuery(chatId);
  const scrollContainerRef = useRef<any>(null);

  useEffect(() => {
    // 데이터가 로드될 때마다 스크롤을 가장 아래로 설정
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [data]);

  // const isChatLoading = useSkeletonStore((state) => state.isChatLoading);

  if (!data) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full p-4 overflow-auto"
      ref={scrollContainerRef}
    >
      <div className="w-full h-full space-y-4">
        {data.map((message, index) => (
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
              <div className="bg-muted max-w-[75%] p-4 rounded-2xl">
                {/* <Skeleton className="h-4 w-[200px]" /> */}
                <CursorLoading />
              </div>
            ) : (
              <div
                className={`rounded-3xl p-4 whitespace-pre-wrap max-w-[75%] ${
                  message.isUser
                    ? "bg-primary text-primary-foreground font-normal"
                    : "bg-muted text-muted-foreground text-[#0E1E46]"
                }`}
              >
                {message.isUser ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    className="prose"
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
