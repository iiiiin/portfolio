import { getAllPosts } from "@/lib/blog";
import BlogPostList from "@/components/blog/BlogPostList";

export const metadata = {
  title: "Blog | 권인 포트폴리오",
  description: "개발 과정과 프로젝트 회고를 기록하는 블로그입니다.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-background px-4 pt-16 flex flex-col">
      <section className="mx-auto max-w-4xl flex-1 w-full">
        <header className="mb-10">
          <h1 className="mt-2 text-4xl font-bold text-foreground">Blog</h1>
        </header>
        <BlogPostList posts={posts} />
      </section>
      <footer className="border-t border-gray-200 py-8 text-center">
        <p className="text-sm text-foreground-muted">
          © 2026. Kwon In. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
