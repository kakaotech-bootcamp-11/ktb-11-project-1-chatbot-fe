// app/api/gpt/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: body.prompt }],
      max_tokens: 100,
      stream: true,
    }),
  });

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
