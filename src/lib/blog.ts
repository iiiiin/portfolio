import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function isMdxFile(fileName: string) {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md");
}

function toSlug(fileName: string) {
  return fileName.replace(/\.(mdx|md)$/i, "");
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);

  const posts = await Promise.all(
    files.filter(isMdxFile).map(async (fileName) => {
      const fullPath = path.join(BLOG_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);

      return {
        slug: toSlug(fileName),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags)
          ? data.tags.map((tag) => String(tag))
          : [],
        draft: Boolean(data.draft),
      } satisfies BlogPostMeta;
    })
  );

  return posts
    .filter((post) => (process.env.NODE_ENV === "production" ? !post.draft : true))
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const candidates = [path.join(BLOG_DIR, `${slug}.mdx`), path.join(BLOG_DIR, `${slug}.md`)];

  for (const fullPath of candidates) {
    try {
      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags)
          ? data.tags.map((tag) => String(tag))
          : [],
        draft: Boolean(data.draft),
        content,
      };
    } catch {
      continue;
    }
  }

  return null;
}

