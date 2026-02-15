import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | 권인 포트폴리오",
  description: "개발 과정과 프로젝트 회고를 기록하는 블로그입니다.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <section className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="mt-2 text-4xl font-bold text-foreground">Blog</h1>
          <p className="mt-3 text-foreground-secondary">
            프로젝트 구현 과정, 문제 해결, 회고를 정리합니다.
          </p>
        </header>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border bg-background-card p-6 transition-colors hover:border-accent-primary/60"
            >
              <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
              <p className="mt-2 text-foreground-secondary">{post.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-foreground-muted">{post.date}</span>
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent-primary/20 bg-accent-primary/10 px-2.5 py-1 text-accent-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
