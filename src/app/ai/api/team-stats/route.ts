import { TeamStatistics } from "@/types/team-statistics";
import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";
import { NextRequest } from "next/server";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { statistics }: { statistics: TeamStatistics } = await req.json();

  const systemPrompt = `Masz za zadanie podsumować statystyki drużyny harcerskiej na podstawie dostarczonych danych. Worksheet = próba, patrol = zastęp. Odpowiadaj zwięźle i rzeczowo, unikaj zbędnych powtórzeń. Podsumowanie powinno być zrozumiałe dla osób nieznających kontekstu statystyk. Nie używaj nazw kluczy JSON.`;

  try {
    const { text } = await generateText({
      model: xai("grok-3-mini"),
      prompt: JSON.stringify(statistics),
      system: systemPrompt,
      temperature: 0.7,
    });
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response("Failed to generate response", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
