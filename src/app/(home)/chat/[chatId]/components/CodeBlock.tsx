import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={materialDark}
      // wrapLines={true} // 라인 래핑
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }} // 긴 줄의 코드 처리
    >
      {value}
    </SyntaxHighlighter>
  );
};
