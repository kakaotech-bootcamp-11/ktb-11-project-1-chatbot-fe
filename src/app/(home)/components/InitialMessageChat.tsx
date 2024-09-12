"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import useSkeletonStore from "@/store/skeletonStore";
import useInitialDataStore from "@/store/initialDataStore";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "../chat/[chatId]/components/CodeBlock";
import CursorLoading from "../chat/[chatId]/components/CursorLoading";

export default function InitialMessageChat() {
  const { isChatLoading } = useSkeletonStore((state) => state);

  const { initialData } = useInitialDataStore((state) => state);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 overflow-y-auto">
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
                <AvatarImage
                  src="/images/ktb_balloon_logo.jpeg"
                  alt="ai_logo"
                />
              </Avatar>
            )}

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
                <span className="flex items-center">
                  <ReactMarkdown
                    className="prose prose-p:my-0"
                    remarkPlugins={[remarkGfm]}
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
                    {message.content
                      .replace(/(\d+)\./g, "\n$1.&nbsp;")
                      .replace(/\. /g, ".\n")
                      .trim()}
                  </ReactMarkdown>
                  {message.content === "" &&
                    isChatLoading &&
                    index === initialData.length - 1 && <CursorLoading />}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
