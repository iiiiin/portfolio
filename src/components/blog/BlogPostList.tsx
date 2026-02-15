"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface BlogPostItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface BlogPostListProps {
  posts: BlogPostItem[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags ?? []);
    return Array.from(new Set(allTags));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === "all") {
      return posts;
    }
    return posts.filter((post) => (post.tags ?? []).includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <>
      <div className="mb-8 overflow-x-auto">
        <div className="flex w-max items-center gap-2 pb-1">
          <button
            type="button"
            onClick={() => setSelectedTag("all")}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selectedTag === "all"
                ? "border-accent-primary bg-accent-primary text-white"
                : "border-border bg-background-card text-foreground-secondary hover:border-accent-primary/50 hover:text-accent-primary"
            }`}
          >
            전체
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-border bg-background-card text-foreground-secondary hover:border-accent-primary/50 hover:text-accent-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-border bg-background-card p-6 transition-colors hover:border-accent-primary/60"
          >
            <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 text-foreground-secondary">{post.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-foreground-muted">{post.date}</span>
              {(post.tags ?? []).map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="rounded-full border border-accent-primary/20 bg-accent-primary/10 px-2.5 py-1 text-accent-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

