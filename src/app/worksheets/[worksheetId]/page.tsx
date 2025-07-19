import { WorksheetItem } from "@/components/worksheets/worksheet-item";
import { fetchWorksheet } from "@/lib/server-api";
import type { Metadata } from "next";
import React from "react";

interface WorksheetEditPageProps {
  params: Promise<{
    worksheetId: string;
  }>;
}

const WorksheetPage = async ({ params }: WorksheetEditPageProps) => {
  const { worksheetId } = await params;

  const { worksheet, error: worksheetError } =
    await fetchWorksheet(worksheetId);
  if (worksheetError) {
    return worksheetError;
  }

  return <WorksheetItem worksheet={worksheet!} variant={"shared"} />;
};

export default WorksheetPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ worksheetId: string }>;
}): Promise<Metadata> {
  const { worksheetId } = await params;

  const { worksheet, error: worksheetError } =
    await fetchWorksheet(worksheetId);
  if (worksheetError) {
    return { title: "Błąd" };
  }

  return {
    title: worksheet?.name
      ? `${worksheet.name} - ${worksheet.user.displayName}`
      : "Próba",
    description: worksheet?.description || undefined,
    openGraph: {
      title: worksheet?.name
        ? `${worksheet.name} - ${worksheet.user.displayName}`
        : "Próba",
      description: worksheet?.description || undefined,
      images: [
        {
          url: "https://eproba.zhr.pl/og-image.png",
          width: 1200,
          height: 630,
          alt: worksheet?.name
            ? `${worksheet.name} - ${worksheet.user.displayName}`
            : "Próba",
        },
      ],
    },
  };
}
