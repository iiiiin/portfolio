import { IconLinkButton } from "./IconLinkButton";

export function RssIconButton({ href, label = "RSS" }: { href: string; label?: string }) {
  return (
    <IconLinkButton href={href} label={label}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    </IconLinkButton>
  );
}
