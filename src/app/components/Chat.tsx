import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Chat() {
  const messages = [
    { sender: "user", content: "안녕 오늘의 날씨를 알려줘" },
    {
      sender: "bot",
      content:
        "오늘 서울의 날씨는 오후에 가벼운 소나기가 예상되며, 저녁이 되면 구름이 조금 걷히면서 부분적으로 맑아질 것입니다...",
    },
    { sender: "user", content: "Can you show me a simple Python function?" },
    {
      sender: "bot",
      content:
        "Sure! Here's a simple Python function that calculates the factorial of a number:\n\n```python\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)\n\n# Example usage\nprint(factorial(5))  # Output: 120\n```\n\nThis function uses recursion to calculate the factorial.",
    },
  ];

  return (
    <div className="bg-purple-50 h-full overflow-auto">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.sender === "bot" ? "justify-end" : ""
            }`}
          >
            {message.sender === "user" && (
              <Avatar className="flex-shrink-0 w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-4 max-w-[75%] ${
                message.sender === "bot"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <ReactMarkdown
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
            </div>
            {message.sender === "bot" && (
              <Avatar className="flex-shrink-0 w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
