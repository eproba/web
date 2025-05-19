import { IframeRenderer } from "@/components/iframe-renderer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function TeamStatisticsPage() {
  return (
    <>
      <IframeRenderer src="/proxy/team/stats" />
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Uwaga!</AlertTitle>
        <AlertDescription>
          <p>
            Ta strona korzysta ze starej wersji aplikacji. Jeśli występują
            problemy z wyświetlaniem tej strony, spróbuj otworzyć ją w nowej
            karcie klikając
            <a
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/team/stats`}
              target="_blank"
              className="text-blue-500 hover:underline"
              rel="noopener noreferrer"
            >
              {" "}
              tutaj
            </a>
            .
          </p>
        </AlertDescription>
      </Alert>
    </>
  );
}
