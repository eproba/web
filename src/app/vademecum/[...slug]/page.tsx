import { AreaGrid } from "@/components/vademecum/area-grid";
import { PageView } from "@/components/vademecum/page-view";
import { PAGES, getPage } from "@/lib/vademecum/navigation";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.filter((page) => page.slug).map((page) => ({
    slug: page.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug.join("/"));
  return page
    ? { title: `${page.title} – Vademecum`, description: page.description }
    : {};
}

export default async function VademecumPage({ params }: Props) {
  const page = getPage((await params).slug.join("/"));
  if (!page) notFound();

  return (
    <PageView page={page}>
      {page.slug === "guideposts" && <AreaGrid />}
    </PageView>
  );
}
