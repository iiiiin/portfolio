"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

const POSTS_PER_PAGE = 8;

export default function BlogPostList({ posts }: BlogPostListProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const movePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground-secondary">Tags</span>
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center text-foreground-secondary transition-colors hover:text-accent-primary"
            aria-label={isFilterOpen ? "필터 접기" : "필터 펼치기"}
          >
            {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {isFilterOpen ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleTagSelect("all")}
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
                onClick={() => handleTagSelect(tag)}
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
        ) : (
          <div className="mt-2 flex items-center">
            <span
              className={`rounded-full border px-3 py-1 text-xs ${
                selectedTag === "all"
                  ? "border-border bg-background-card text-foreground-muted"
                  : "border-accent-primary/20 bg-accent-primary/10 text-accent-primary"
              }`}
            >
            {selectedTag === "all" ? "전체" : selectedTag}
          </span>
          </div>
        )}
      </div>

      <div className="mb-6 border-b border-border" />

      <div className="space-y-4">
        {paginatedPosts.map((post) => (
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
                  className="rounded-full border border-accent-primary/20 bg-accent-primary/10 px-2 py-0.5 text-xs text-accent-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => movePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => movePage(page)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              currentPage === page
                ? "border-accent-primary bg-accent-primary text-white"
                : "border-border text-foreground-secondary hover:border-accent-primary/50 hover:text-accent-primary"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => movePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </>
  );
}
