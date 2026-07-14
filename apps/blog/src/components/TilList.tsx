"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useDarkMode, Footer, type UiTheme } from "@inkwon/ui";
import { SANS, BODY } from "@/lib/til-theme";
import TilHeader from "@/components/TilHeader";

const PAGE_SIZE = 10;

export interface TilListPost {
  slug: string;
  title: string;
  summary: string;
  dateStr: string;
  tags: string[];
}

function chipStyle(theme: UiTheme, active: boolean): CSSProperties {
  return active
    ? {
        padding: "6px 14px",
        borderRadius: 999,
        border: `1px solid ${theme.accent}`,
        background: theme.accent,
        color: theme.bg,
        fontFamily: SANS,
        fontSize: 13,
        cursor: "pointer",
      }
    : {
        padding: "6px 14px",
        borderRadius: 999,
        border: `1px solid ${theme.chipBorder}`,
        background: theme.chipBg,
        color: theme.chipText,
        fontFamily: SANS,
        fontSize: 13,
        cursor: "pointer",
      };
}

export default function TilList({ posts }: { posts: TilListPost[] }) {
  const { theme } = useDarkMode();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagePosts = filtered.slice(start, start + PAGE_SIZE);

  const setTag = (name: string) => {
    setActiveTag((cur) => (cur === name ? null : name));
    setPage(1);
    sendGAEvent("event", "tag_filter_click", { tag: name });
  };

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        color: theme.text,
        fontFamily: SANS,
        WebkitFontSmoothing: "antialiased",
        transition: "background .15s,color .15s",
      }}
    >
      <TilHeader />

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "56px 24px 64px" }}>
        <header style={{ marginBottom: 44 }}>
          <h1 style={{ fontSize: 27, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
            Blog
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 16,
              lineHeight: 1.6,
              color: theme.muted,
              margin: 0,
              maxWidth: "46ch",
            }}
          >
            기술 개발 경험을 기록하는 블로그입니다.
          </p>
        </header>

        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 40,
            paddingBottom: 32,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <button
            style={chipStyle(theme, !activeTag)}
            onClick={() => {
              setActiveTag(null);
              setPage(1);
              sendGAEvent("event", "tag_filter_click", { tag: "전체" });
            }}
          >
            전체
          </button>
          {tags.map((tag) => (
            <button key={tag} style={chipStyle(theme, activeTag === tag)} onClick={() => setTag(tag)}>
              {tag}
            </button>
          ))}
        </nav>

        {pagePosts.length > 0 && (
          <>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {pagePosts.map((post) => (
                <li key={post.slug} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <Link
                    href={`/${post.slug}`}
                    style={{ textDecoration: "none", display: "block", padding: "26px 0" }}
                    onClick={() => sendGAEvent("event", "post_card_click", { slug: post.slug, title: post.title })}
                  >
                    <h2 style={{ fontSize: 19, fontWeight: 600, margin: "0 0 7px", letterSpacing: "-0.01em", color: theme.text }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: BODY, fontSize: 15.5, lineHeight: 1.6, color: theme.textSoft, margin: "0 0 12px" }}>
                      {post.summary}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: theme.muted }}>
                      <time>{post.dateStr}</time>
                      <span>·</span>
                      <span>{post.tags.join(" · ")}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 44 }}>
                {Array.from({ length: totalPages }, (_, i) => {
                  const n = i + 1;
                  const active = n === safePage;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: `1px solid ${active ? theme.accent : theme.border}`,
                        background: active ? theme.accent : "transparent",
                        color: active ? theme.bg : theme.textSoft,
                        fontFamily: SANS,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {filtered.length === 0 && (
          <p style={{ fontFamily: BODY, color: theme.muted, fontSize: 15, padding: "40px 0" }}>
            {posts.length === 0 ? "아직 발행된 글이 없습니다." : "해당 태그의 글이 아직 없습니다."}
          </p>
        )}
      </div>

      <Footer name="In Kwon" maxWidth={660} />
    </div>
  );
}
