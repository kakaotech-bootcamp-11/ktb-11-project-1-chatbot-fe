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
              className={`rounded-3xl p-4 max-w-[80%] ${
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
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a({ href, children }) {
                        return (
                          <a
                            href={href}
                            className="text-blue-500 hover:underline"
                          >
                            {children}
                          </a>
                        );
                      },
                      h1({ children }) {
                        return (
                          <p className="font-bold text-2xl mb-2 last:mb-0">
                            {children}
                          </p>
                        );
                      },
                      // p({ children }) {
                      //   return <p className="mb-0 last:mb-0">{children}</p>;
                      // },
                      code({ node, inline, className, children, ...props }) {
                        if (children.length) {
                          if (children[0] == "▍") {
                            return (
                              <span className="mt-1 animate-pulse cursor-default">
                                ▍
                              </span>
                            );
                          }

                          children[0] = (children[0] as string).replace(
                            "`▍`",
                            "▍"
                          );
                        }

                        const match = /language-(\w+)/.exec(className || "");

                        if (inline) {
                          return (
                            <code
                              className={`relative text-red-400 bg-slate-300 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }

                        return (
                          <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ""}
                            // value={String(children)}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        );
                      },
                    }}
                  >
                    {/* {markdown} */}
                    {message.content}
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
