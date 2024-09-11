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
const markdown = `
# Hello World! 
**This** is a paragraph in **markdown**. 

\`\`\`js
// This is a JavaScript code block
console.log('Hello, world!');
\`\`\`

- List item 1
- List item 2

[Google](https://www.google.com)
# Title

This is a paragraph.

- [ ] Task 1
- [x] Task 2

~~Strikethrough text~~
`;

export default function Chat({ chatId }: Props) {
  const { data, error, isLoading } = useChatHistoryQuery(chatId);
  const scrollContainerRef = useRef<any>(null);
  const { isChatLoading } = useSkeletonStore((state) => state);

  const { initialData } = useInitialDataStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    // 데이터가 로드될 때마다 스크롤을 가장 아래로 설정
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [data, initialData]);

  if (isLoading && chatId !== 0 && !initialData) return <Loading />;
  if (error) {
    toast.error("오류가 발생했습니다.");
    router.push("/");
  }

  const chatData = initialData.length !== 0 ? initialData : data;

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
                    {/* {markdown} */}
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
