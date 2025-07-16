import { Card, CardContent } from "@/components/ui/card";
import { fetchCurrentUser } from "@/lib/server-api";
import type { Metadata } from "next";

import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default async function ContactPage() {
  const { user } = await fetchCurrentUser();

  return (
    <div className="space-y-6">
      <ContactForm initialEmail={user?.email} />
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">Informacje kontaktowe</h1>
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
