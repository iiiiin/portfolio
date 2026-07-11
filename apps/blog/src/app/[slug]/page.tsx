import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug } from "@/lib/notion";
import { remarkMermaid } from "@/lib/remark-mermaid";
import { rehypeWrapTables } from "@/lib/rehype-wrap-tables";
import { getSiteUrl } from "@/lib/site-url";
import Mermaid from "@/components/Mermaid";
import TilDetail from "@/components/TilDetail";

export const revalidate = 60;

const prettyCodeOptions = {
  theme: "github-dark",
};

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `${getSiteUrl()}/${slug}`;

  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      type: "article",
      url,
      publishedTime: post.publishedAt || undefined,
      tags: post.tags,
    },
  };
}

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

  const url = `${getSiteUrl()}/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    url,
    keywords: post.tags.length ? post.tags.join(", ") : undefined,
    author: { "@type": "Person", name: "In Kwon" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TilDetail
        title={post.title}
        dateStr={formatDate(post.publishedAt)}
        tagsStr={post.tags.join(" · ")}
      >
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMermaid],
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeWrapTables],
            },
          }}
          components={{ Mermaid }}
        />
      </TilDetail>
    </>
  );
}