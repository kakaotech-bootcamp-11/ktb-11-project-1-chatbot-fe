// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // 첫 번째 청크 (TITLE)
      controller.enqueue(
        encoder.encode(
          `data: {"aiResponse": {"type":"TITLE","content":"","chatId":1, "title": "title"}}\n\n`
        )
      );

      // 두 번째 청크 (MESSAGE "안녕")
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            `data: {"aiResponse": {"type":"MESSAGE","content":"안녕","chatId":1, "title": ""}}\n\n`
          )
        );
      }, 1000); // 1초 대기 후 전송

      // 세 번째 청크 (MESSAGE "하")
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            `data: {"aiResponse": {"type":"MESSAGE","content":"하","chatId":1, "title": ""}}\n\n`
          )
        );
      }, 2000); // 2초 대기 후 전송

      // 네 번째 청크 (MESSAGE "세")
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            `data: {"aiResponse": {"type":"MESSAGE","content":"세","chatId":1, "title": ""}}\n\n`
          )
        );
      }, 3000); // 3초 대기 후 전송

      // 다섯 번째 청크 (MESSAGE "요")
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            `data: {"aiResponse": {"type":"MESSAGE","content":"요","chatId":1, "title": ""}}\n\n`
          )
        );
      }, 4000); // 4초 대기 후 전송

      // 마지막 청크 (DONE)
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            `data: {"aiResponse": {"type":"DONE","content":"","chatId":1, "title": ""}}\n\n`
          )
        );
        controller.close(); // 스트림 종료
      }, 5000); // 5초 대기 후 전송 및 종료
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
