"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

import { CodeBlock } from "./CodeBlock";
import { useChatHistoryQuery } from "@/app/(home)/hooks/useChatQuery";
import Loading from "@/app/components/loading";
import { useEffect, useRef } from "react";
import CursorLoading from "./CursorLoading";
import useSkeletonStore from "@/store/skeletonStore";
import useInitialDataStore from "@/store/initialDataStore";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  chatId: number;
};
const markdown = `# Hello World!
**This** is a paragraph in **12월 26일(목)**.
\`\`\`js
// This is a JavaScript code block
console.log('Hello, world!');
\`\`\`
- List \`item\` 1
- List item 2\n
[Google](https://www.google.com)
# Title
This is a \`paragraph\`.
- [ ] Task 1
- [x] Task 2

~~Strikethrough text~~
`;

const markdown2 = `최종 프로젝트 기획 발표일은 **12월 26일(목)** 입니다.`;

export default function Chat({ chatId }: Props) {
  const { data, error, isFetching } = useChatHistoryQuery(chatId);
  const scrollContainerRef = useRef<any>(null);
  const { isChatLoading } = useSkeletonStore((state) => state);

  const { initialData, resetInitialData } = useInitialDataStore(
    (state) => state
  );
  const router = useRouter();

  useEffect(() => {
    // 데이터가 로드될 때마다 스크롤을 가장 아래로 설정
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [data, initialData]);

  useEffect(() => {
    if (data && !isFetching) {
      resetInitialData();
    }
  }, [data, isFetching, resetInitialData]);

  if (error) {
    toast.error("오류가 발생했습니다.");
    router.push("/");
  }

  const chatData = initialData.length !== 0 || isFetching ? initialData : data;

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full p-4 overflow-y-auto"
      ref={scrollContainerRef}
    >
      <div className="w-full h-full space-y-4">
        {chatData?.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.isUser ? "justify-end" : ""
            }`}
          >
            {!message.isUser && (
              <Avatar className="flex-shrink-0 w-8 h-8 border">
                <AvatarFallback>.</AvatarFallback>
                <AvatarImage
                  src="/images/ktb_balloon_logo.jpeg"
                  alt="ai_logo"
                />
              </Avatar>
            )}

            <div
              className={`rounded-3xl p-4 max-w-full ${
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
                              className={`relative text-red-400 before:content-[''] after:content-[''] bg-[#e5e9ed] rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
                              {...props}
                            >
                              {/* {String(children).replace(/`/g, "")} */}
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
                    {/* {markdown2} */}
                    {message.content.replace(/\*\*(.*?)\*\*/g, "**$1** ")}
                  </ReactMarkdown>
                  {message.content === "" &&
                    isChatLoading &&
                    index === chatData.length - 1 && <CursorLoading />}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
