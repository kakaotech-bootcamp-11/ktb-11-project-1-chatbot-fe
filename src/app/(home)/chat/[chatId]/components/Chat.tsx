"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

import {CodeBlock} from "./CodeBlock";
import {ChatContent, useChatHistoryQuery} from "@/app/(home)/hooks/useChatQuery";

export default function Chat() {
    // todo chatId 가져오기
    const {data, error, isLoading} = useChatHistoryQuery(1);
    const chatMessages = data ?? [];
    console.log("chatMessages", chatMessages);
    // Dummy Message
    // return (
    //     <div className="flex h-full p-4 overflow-auto">
    //         <div className="space-y-4">
    //             {/*{messages.map((message, index) => (*/}
    //             {messages.map((message, index) => (
    //                 <div
    //                     key={index}
    //                     className={`flex items-start gap-4 ${
    //                         message.sender === "user" ? "justify-end" : ""
    //                     }`}
    //                 >
    //                     {message.sender === "bot" && (
    //                         <Avatar className="flex-shrink-0 w-8 h-8 border">
    //                             <AvatarFallback>JD</AvatarFallback>
    //                         </Avatar>
    //                     )}
    //                     <div
    //                         className={`rounded-lg p-4 max-w-[75%] ${
    //                             message.sender === "user"
    //                                 ? "bg-primary text-primary-foreground"
    //                                 : "bg-muted text-muted-foreground text-[#0E1E46]"
    //                         }`}
    //                     >
    //                         <ReactMarkdown
    //                             className="prose"
    //                             components={{
    //                                 code({node, className, children, ...props}) {
    //                                     const match = /language-(\w+)/.exec(className || "");
    //                                     return match ? (
    //                                         <CodeBlock
    //                                             language={match[1]}
    //                                             value={String(children).replace(/\n$/, "")}
    //                                             {...props}
    //                                         />
    //                                     ) : (
    //                                         <code className={className} {...props}>
    //                                             {children}
    //                                         </code>
    //                                     );
    //                                 },
    //                             }}
    //                         >
    //                             {message.content}
    //                         </ReactMarkdown>
    //                     </div>
    //                     {message.sender == "user" && (
    //                         <Avatar className="flex-shrink-0 w-8 h-8 border">
    //                             <AvatarFallback>CB</AvatarFallback>
    //                         </Avatar>
    //                     )}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

    // api fetch
    return (
        <div className="flex h-full p-4 overflow-auto">
            <div className="space-y-4">
                {chatMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-4 ${
                            message.isUser ? "justify-end" : ""
                        }`}
                    >
                        {!message.isUser && (
                            <Avatar className="flex-shrink-0 w-8 h-8 border">
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={`rounded-lg p-4 max-w-[75%] ${
                                message.isUser
                                    // message.sender === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground text-[#0E1E46]"
                            }`}
                        >
                            <ReactMarkdown
                                className="prose"
                                components={{
                                    code({node, className, children, ...props}) {
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
                        </div>
                        {message.isUser && (
                            <Avatar className="flex-shrink-0 w-8 h-8 border">
                                <AvatarFallback>CB</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
