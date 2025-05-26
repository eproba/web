import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { handleError } from "@/lib/error-alert-handler";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { postSerializer } from "@/lib/serializers/news";
import { Post } from "@/types/news";

export default async function NewsPage() {
  const session = await auth();

  const headers = {
    "Content-Type": "application/json",
    ...(session?.accessToken
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {}),
  };

  const response = await fetch(`${API_URL}/news/`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return await handleError(response);
  }

  const news = (await response.json()).map(postSerializer) as Post[];

  const pinnedNews = news
    .filter((post) => post.pinned)
    .sort(
      (a, b) =>
        b.priority - a.priority ||
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
    );
  const otherNews = news
    .filter((post) => !post.pinned)
    .sort(
      (a, b) =>
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
    );

  return (
    <div className="space-y-4">
      {pinnedNews.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">Ważne aktualności</h1>
          <div className="grid gap-4">
            {pinnedNews.map((post) => (
              <Card key={post.id} className="gap-2">
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
            ))}
          </div>
        </>
      )}

      {otherNews.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">Aktualności dla Ciebie</h1>
          <div className="grid gap-4">
            {otherNews.map((post) => (
              <Card key={post.id} className="gap-2">
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
            ))}
          </div>
        </>
      )}

      {news.length === 0 && (
        <Card className="p-4">
          <CardContent>
            <p className="text-muted-foreground">
              Brak aktualności do wyświetlenia.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
