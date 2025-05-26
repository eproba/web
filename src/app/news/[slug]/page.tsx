import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { notFound } from "next/navigation";
import { handleError } from "@/lib/error-alert-handler";
import { postSerializer } from "@/lib/serializers/news";
import Link from "next/link";

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const { slug } = await params;

  const headers = {
    "Content-Type": "application/json",
    ...(session?.accessToken
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {}),
  };

  const response = await fetch(`${API_URL}/news/${slug}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return await handleError(response);
  }

  const post = postSerializer(await response.json());

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
