import { TeamRequestForm } from "@/components/team/team-request-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zgłoś drużynę",
};

export default async function TeamRequestPage() {
  return (
    <div className="container mx-auto">
      <TeamRequestForm />
    </div>
  );
}
