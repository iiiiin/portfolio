import Link from "next/link";
import { getPublishedPosts } from "@/lib/notion";

// 60초마다 백그라운드에서 재검증 (Notion에서 새 글 발행하면 최대 1분 내 반영)
export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-10">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-neutral-500">아직 발행된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/${post.slug}`} className="group block">
                <h2 className="text-lg font-medium group-hover:underline">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-neutral-500 text-sm mt-1">
                    {post.summary}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                    </time>
                  )}
                  {post.tags.length > 0 && (
                    <span>{post.tags.join(", ")}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}