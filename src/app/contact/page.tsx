import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Metadata } from "next";

import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default async function ContactPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Skontaktuj się z nami</h1>
          <p>Masz pytania, sugestie lub potrzebujesz pomocy? Napisz do nas!</p>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h1 className="text-2xl font-semibold">Informacje kontaktowe</h1>
          <p className="mt-2">
            Jeśli chcesz, możesz również napisać bezpośrednio na adres:{" "}
            <a
              href="mailto:eproba@zhr.pl"
              target="_blank"
              className="text-[#1abc9c] hover:underline"
            >
              eproba@zhr.pl
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
