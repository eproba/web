import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, category } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const systemPrompt =
      category === "general"
        ? `Jesteś ekspertem od tworzenia zadań edukacyjnych dla grup. Twoim zadaniem jest pomaganie w tworzeniu kreatywnych i angażujących zadań OGÓLNYCH dla grup uczestników (harcerzy, skautów, uczniów). 

Zadania ogólne to takie, które:
- Wykonuje cała grupa razem
- Wymagają współpracy i komunikacji
- Budują więzi w grupie
- Często są realizowane na świeżym powietrzu lub w ramach zajęć grupowych

Zawsze odpowiadaj w języku polskim. Gdy użytkownik opisuje temat lub aktywność, zaproponuj 3-4 konkretne zadania z krótkimi opisami. Zadania powinny być praktyczne, wykonalne i dostosowane do różnych grup wiekowych.

Format odpowiedzi:
1. Krótka odpowiedź na zapytanie użytkownika
2. Lista zadań w formacie: **Nazwa zadania** - opis tego co należy zrobić

Przykład:
**Obserwacja ptaków** - Zanotuj co najmniej 5 różnych gatunków ptaków wraz z ich zachowaniami
**Budowa schronienia** - Zbuduj tymczasowe schronienie używając tylko materiałów naturalnych`
        : `Jesteś ekspertem od tworzenia zadań edukacyjnych dla jednostek. Twoim zadaniem jest pomaganie w tworzeniu kreatywnych i angażujących zadań INDYWIDUALNYCH dla pojedynczych uczestników (harcerzy, skautów, uczniów).

Zadania indywidualne to takie, które:
- Wykonuje jedna osoba samodzielnie
- Rozwijają indywidualne umiejętności i talenty
- Mogą być dostosowane do różnych poziomów zaawansowania
- Często wymagają osobistej refleksji lub autodyscypliny

Zawsze odpowiadaj w języku polskim. Gdy użytkownik opisuje temat lub aktywność, zaproponuj 3-4 konkretne zadania z krótkimi opisami. Zadania powinny być praktyczne, wykonalne i dostosowane do różnych grup wiekowych.

Format odpowiedzi:
1. Krótka odpowiedź na zapytanie użytkownika
2. Lista zadań w formacie: **Nazwa zadania** - opis tego co należy zrobić

Przykład:
**Dziennik obserwacji przyrody** - Przez tydzień zapisuj codzienne obserwacje przyrody w okolicy
**Portfolio fotograficzne** - Stwórz kolekcję 20 zdjęć przedstawiających różne tekstury w naturze`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const responseText =
      completion.choices[0]?.message?.content ||
      "Przepraszam, nie mogę wygenerować odpowiedzi w tym momencie.";

    // Parse the response to extract task suggestions
    const taskSuggestions = parseTaskSuggestions(responseText);

    return NextResponse.json({
      content: responseText,
      suggestions: taskSuggestions,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas przetwarzania zapytania" },
      { status: 500 },
    );
  }
}

function parseTaskSuggestions(
  responseText: string,
): Array<{ id: string; task: string; description: string }> {
  const suggestions: Array<{ id: string; task: string; description: string }> =
    [];

  // Look for patterns like "**Task Name** - description"
  const taskPattern = /\*\*([^*]+)\*\*\s*[-–]\s*([^\n]+)/g;
  let match;
  let index = 0;

  while ((match = taskPattern.exec(responseText)) !== null && index < 5) {
    const taskName = match[1].trim();
    const description = match[2].trim();

    if (taskName && description) {
      suggestions.push({
        id: `ai-suggestion-${index + 1}`,
        task: taskName,
        description: description,
      });
      index++;
    }
  }

  return suggestions;
}
