import { getAllPosts } from "@/lib/blog";
import BlogPostList from "@/components/blog/BlogPostList";

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
        </header>
        <BlogPostList posts={posts} />
      </section>
    </main>
  );
}
