import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    // 🔒 fallback summary
    let summary =
      content.length > 120 ? content.slice(0, 120) + "..." : content;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize briefly." },
          { role: "user", content },
        ],
      });

      summary =
        completion.choices[0]?.message?.content?.trim() || summary;
    } catch (aiError) {
      console.log("⚠️ OpenAI failed, using fallback");
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ summary: null }, { status: 500 });
  }
}
