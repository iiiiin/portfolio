"use client";

import { useDarkMode } from "./useDarkMode";

export function DarkModeToggle() {
  const { dark, setDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5">
      <button
        type="button"
        onClick={() => setDarkMode(false)}
        aria-label="라이트 모드"
        aria-pressed={!dark}
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-full transition-colors ${
          !dark ? "bg-accent-primary text-background" : "text-foreground-secondary"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setDarkMode(true)}
        aria-label="다크 모드"
        aria-pressed={dark}
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-full transition-colors ${
          dark ? "bg-accent-primary text-background" : "text-foreground-secondary"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      </button>
    </div>
  );
}
