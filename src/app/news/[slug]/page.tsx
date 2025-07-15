import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchNewsPost } from "@/lib/server-api";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { post, error } = await fetchNewsPost(slug);

  if (error) {
    return error;
  }

  if (!post) {
    notFound();
  }

  return (
    <Card className="gap-2">
      <CardHeader>
        <Link href={`/news/${post.slug}`}>
          <CardTitle>{post.title}</CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm">
          {new Date(post.createdOn).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardContent>
    </Card>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post, error } = await fetchNewsPost(slug);

  if (error || !post) {
    return {
      title: "Post nie znaleziony",
    };
  }

  return {
    title: post.title,
  };
}
