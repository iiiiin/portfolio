import type { ReactNode } from "react";

export function IconLinkButton({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={label}
      aria-label={label}
      className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}
