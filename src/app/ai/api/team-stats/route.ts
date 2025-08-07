import { TeamStatistics } from "@/types/team-statistics";
import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { prompt: statistics }: { prompt: TeamStatistics } = await req.json();
  console.log(statistics);

  const systemPrompt = `Masz za zadanie podsumować statystyki drużyny harcerskiej na podstawie dostarczonych danych. 
  Worksheet = próba, patrol = zastęp. Odpowiadaj zwięźle i rzeczowo, unikaj zbędnych powtórzeń. 
  Podsumowanie powinno być zrozumiałe dla osób nieznających kontekstu statystyk. 
  Nie używaj nazw kluczy JSON oraz odpowiadaj po polsku.
  Tylko nazwy użytkowników są zastąpione <userId:uuid> i zostaną przywrócone w aplikacji więc traktuj je jak zwykłe imiona i nazwiska oraz zwracaj <userId:uuid> w odpowiedziach.
  Postaraj się wyciągnąć wnioski z danych, które mogą być przydatne dla drużynowego.`;

  const result = streamText({
    model: xai("grok-3-mini"),
    prompt: JSON.stringify(statistics),
    system: systemPrompt,
    temperature: 0.7,
  });
  return result.toUIMessageStreamResponse();
}
