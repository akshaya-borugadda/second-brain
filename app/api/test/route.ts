import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    // Call OpenAI to get both summary and tags
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that returns a short summary and 3-5 relevant tags for any note.",
        },
        {
          role: "user",
          content: `Summarize this note concisely and provide 3-5 comma-separated tags:\n\n${content}`,
        },
      ],
      temperature: 0.5,
    });

    const aiText = completion.choices[0].message?.content ?? "";
    
    // Split AI output into summary and tags
    const [summaryLine, tagsLine] = aiText.split("Tags:") || [aiText, ""];
    const summary = summaryLine.replace("Summary:", "").trim();
    const tags = tagsLine
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return NextResponse.json({ summary, tags });
  } catch (error) {
    console.error("AI ERROR:", error);
    return NextResponse.json({ summary: null, tags: [] });
  }
}
