import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const chatContents = [
    {
      isUser: true,
      chatMessageId: 1,
      content: "안녕하세요!",
    },
    {
      isUser: false,
      chatMessageId: 2,
      content: "안녕하세요! 무엇을 도와드릴까요?",
    },
  ];

  return NextResponse.json(chatContents);
}
