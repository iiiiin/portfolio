"use client";

import { Header, IconLinkButton, DarkModeToggle, useDarkMode } from "@inkwon/ui";
import { LOGO_LIGHT, LOGO_DARK, FAVICON_LIGHT, FAVICON_DARK } from "@/lib/til-theme";

export default function TilHeader({ maxWidth = 660 }: { maxWidth?: number }) {
  const { dark } = useDarkMode();

  return (
    <>
      <link rel="icon" href={dark ? FAVICON_DARK : FAVICON_LIGHT} sizes="any" />
      <Header
        homeHref="/"
        logoSrc={LOGO_LIGHT}
        logoDarkSrc={LOGO_DARK}
        logoAlt="로고"
        maxWidth={maxWidth}
        rightSlot={
          <>
            <IconLinkButton href="https://www.inkwon.me/" label="포트폴리오">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <path d="M2 13h20" />
              </svg>
            </IconLinkButton>
            {/* RSS: 사용하지 않아 우선 숨김 (packages/ui의 RssIconButton은 그대로 유지) */}
            <DarkModeToggle />
          </>
        }
      />
    </>
  );
}
