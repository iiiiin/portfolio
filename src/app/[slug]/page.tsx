import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug } from "@/lib/notion";
import { remarkMermaid } from "@/lib/remark-mermaid";
import Mermaid from "@/components/Mermaid";

export const revalidate = 60;

const prettyCodeOptions = {
  theme: "github-dark",
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← 목록으로
      </Link>

      <article className="mt-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>

        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
            </time>
          )}
          {post.tags.length > 0 && <span>{post.tags.join(", ")}</span>}
        </div>

        <div className="prose prose-neutral prose-pre:bg-transparent prose-pre:p-0 mt-8 max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMermaid],
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
            components={{ Mermaid }}
          />
        </div>
      </article>
    </main>
  );
}