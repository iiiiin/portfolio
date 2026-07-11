"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useDarkMode } from "./useDarkMode";

export function Header({
  homeHref,
  logoSrc,
  logoDarkSrc,
  logoAlt = "로고",
  rightSlot,
  maxWidth,
  sticky = true,
  className = "border-b border-border bg-background",
  containerClassName = "px-6 py-4",
  logoSize = 32,
  logoClassName = "rounded-lg",
}: {
  homeHref: string;
  logoSrc: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  rightSlot?: ReactNode;
  maxWidth?: number;
  /** Whether the header sticks to the top of its scroll container. Default true. */
  sticky?: boolean;
  /** Classes applied to the outer <header> (border/background/etc). */
  className?: string;
  /** Classes applied to the inner row (padding/etc). */
  containerClassName?: string;
  /** Logo width/height in px. Default 32. */
  logoSize?: number;
  /** Extra classes applied to the logo image (e.g. corner radius). */
  logoClassName?: string;
}) {
  const { dark } = useDarkMode();
  const activeLogo = dark && logoDarkSrc ? logoDarkSrc : logoSrc;

  return (
    <header className={`${sticky ? "sticky top-0 z-10 " : ""}${className}`}>
      <div
        className={`mx-auto flex items-center justify-between ${containerClassName}`}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <Link
          href={homeHref}
          className="inline-flex shrink-0"
          style={{ width: logoSize, height: logoSize }}
          aria-label="홈으로 이동"
        >
          <Image
            src={activeLogo}
            alt={logoAlt}
            width={logoSize}
            height={logoSize}
            className={`block object-cover ${logoClassName}`}
            style={{ width: logoSize, height: logoSize }}
            priority
          />
        </Link>

        {rightSlot ? <div className="flex items-center gap-2">{rightSlot}</div> : null}
      </div>
    </header>
  );
}
