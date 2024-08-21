"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeBlock } from "./CodeBlock";
import { useChatHistoryQuery } from "@/app/(home)/hooks/useChatQuery";
import Loading from "@/app/components/loading";
import { memo, useEffect, useRef } from "react";
import useInitialDataStore from "@/store/initialDataStore";
import {
  materialDark,
  nord,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// import { CodeProps, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

type Props = {
  chatId: number;
};

export default function Chat({ chatId }: Props) {
  const { data, error, isLoading } = useChatHistoryQuery(chatId);
  const { initialData } = useInitialDataStore((state) => state);

  const scrollContainerRef = useRef<any>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [data]);

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

            <div
              className={`rounded-3xl p-4 whitespace-pre-wrap max-w-[80%] ${
                message.isUser
                  ? "bg-primary text-primary-foreground font-normal"
                  : "bg-muted text-muted-foreground text-ktb_navy"
              }`}
            >
              {message.isUser ? (
                message.content
              ) : (
                <ReactMarkdown
                  className="prose"
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          style={nord}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children)
                            .replace(/\n$/, "")
                            .replace(/\n&nbsp;\n/g, "")
                            .replace(/\n&nbsp\n/g, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                        // <SyntaxHighlighter
                        //   style={nord}
                        //   customStyle={{ backgroundColor: "green" }}
                        //   language="textile"
                        //   PreTag="div"
                        // >
                        //   {String(children).replace(/\n$/, "")}
                        // </SyntaxHighlighter>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
