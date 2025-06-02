import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchNewsPost } from "@/lib/server-api";

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
        <p className="text-sm text-muted-foreground">
          {new Date(post.createdOn).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardContent>
    </Card>
  );
}
