"use client";

import { useDarkMode } from "./useDarkMode";

export function DarkModeToggle() {
  const { dark, setDarkMode } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!dark)}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="theme-toggle inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:text-foreground"
    >
      <svg className="theme-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="theme-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
      </svg>
    </button>
  );
}
