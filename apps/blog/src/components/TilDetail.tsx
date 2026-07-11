"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useDarkMode } from "@inkwon/ui";
import { SANS, BODY } from "@/lib/til-theme";
import TilHeader from "@/components/TilHeader";
import TilFooter from "@/components/TilFooter";
import "./til-prose.css";

export default function TilDetail({
  title,
  dateStr,
  tagsStr,
  children,
}: {
  title: string;
  dateStr: string;
  tagsStr: string;
  children: ReactNode;
}) {
  const { theme } = useDarkMode();

  const proseVars = {
    "--til-bg": theme.bg,
    "--til-text": theme.text,
    "--til-text-soft": theme.textSoft,
    "--til-muted": theme.muted,
    "--til-border": theme.border,
    "--til-border-soft": theme.borderSoft,
    "--til-accent": theme.accent,
    "--til-note-bg": theme.noteBg,
    "--til-mermaid-bg": theme.mermaidBg,
  } as CSSProperties;

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
      <TilHeader maxWidth={680} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 64px" }}>
        <article>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              textDecoration: "none",
              color: theme.accent,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: 18,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            TIL
          </Link>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.3,
              margin: "0 0 14px",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: theme.muted,
              marginBottom: 40,
              paddingBottom: 32,
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <time>{dateStr}</time>
            {tagsStr && (
              <>
                <span>·</span>
                <span>{tagsStr}</span>
              </>
            )}
          </div>

          <div className="til-prose" style={{ fontFamily: BODY, ...proseVars }}>
            {children}
          </div>
        </article>
      </div>

      <TilFooter theme={theme} maxWidth={680} />
    </div>
  );
}
