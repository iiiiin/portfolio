"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { LOGO_LIGHT, LOGO_DARK, FAVICON_LIGHT, FAVICON_DARK, type TilTheme } from "@/lib/til-theme";

export default function TilHeader({
  theme,
  dark,
  setDarkMode,
  maxWidth = 660,
}: {
  theme: TilTheme;
  dark: boolean;
  setDarkMode: (next: boolean) => void;
  maxWidth?: number;
}) {
  const briefcaseStyle: CSSProperties = {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    border: `1px solid ${theme.border}`,
    background: "transparent",
    color: theme.textSoft,
    cursor: "pointer",
  };

  const toggleWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: 2,
    borderRadius: 999,
    border: `1px solid ${theme.border}`,
    background: "transparent",
  };

  const iconBtnBase: CSSProperties = {
    width: 26,
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
  };

  const sunBtnStyle: CSSProperties = {
    ...iconBtnBase,
    background: !dark ? theme.accent : "transparent",
    color: !dark ? theme.bg : theme.textSoft,
  };

  const moonBtnStyle: CSSProperties = {
    ...iconBtnBase,
    background: dark ? theme.accent : "transparent",
    color: dark ? theme.bg : theme.textSoft,
  };

  const logo = (
    <Image
      src={dark ? LOGO_DARK : LOGO_LIGHT}
      alt="로고"
      width={32}
      height={32}
      style={{ borderRadius: 8, display: "block", flexShrink: 0, objectFit: "cover" }}
    />
  );

  return (
    <>
      <link rel="icon" href={dark ? FAVICON_DARK : FAVICON_LIGHT} sizes="any" />
      <div
        style={{
          borderBottom: `1px solid ${theme.border}`,
          background: theme.bg,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
      <div
        style={{
          maxWidth,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "block", width: 32, height: 32 }}>
          {logo}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="https://www.inkwon.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={briefcaseStyle}
            title="포트폴리오"
            aria-label="포트폴리오"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              <path d="M2 13h20"></path>
            </svg>
          </a>
          <div style={toggleWrapStyle}>
            <button style={sunBtnStyle} onClick={() => setDarkMode(false)} aria-label="라이트 모드">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
              </svg>
            </button>
            <button style={moonBtnStyle} onClick={() => setDarkMode(true)} aria-label="다크 모드">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
