import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogViewCounter from "@/components/blog/BlogViewCounter";
import GiscusComments from "@/components/blog/GiscusComments";
import CodeBlockCopyEnhancer from "@/components/blog/CodeBlockCopyEnhancer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-4 pt-16 flex flex-col">
      <article className="mx-auto max-w-3xl flex-1 w-full pb-8">
        <Link
          href="/blog"
          aria-label="블로그 목록으로 돌아가기"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-foreground-muted transition-colors hover:bg-background-secondary hover:text-accent-primary"
        >
          ←
        </Link>
        <header className="mb-10 mt-4 border-b border-border pb-6">
          <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
          <p className="mt-3 text-foreground-secondary">{post.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-foreground-muted">{post.date}</span>
            <BlogViewCounter slug={post.slug} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent-primary/20 bg-accent-primary/10 px-2 py-0.5 text-xs text-accent-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-foreground-secondary prose-strong:text-foreground prose-a:text-accent-primary">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark",
                        light: "github-light",
                      },
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        <CodeBlockCopyEnhancer />
        <GiscusComments slug={post.slug} />
      </article>
      <footer className="mt-14 border-t border-gray-200 py-8 text-center">
        <p className="text-sm text-foreground-muted">
          © 2026. Kwon In. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
