import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchNews } from "@/lib/server-api";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aktualności",
};

export default async function NewsPage() {
  const { posts: news, error } = await fetchNews();

  if (error) {
    return error;
  }

  const pinnedNews = news!
    .filter((post) => post.pinned)
    .sort(
      (a, b) =>
        b.priority - a.priority ||
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
    );
  const otherNews = news!
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
                  <p className="text-muted-foreground text-sm">
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
                  <p className="text-muted-foreground text-sm">
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

      {news!.length === 0 && (
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
