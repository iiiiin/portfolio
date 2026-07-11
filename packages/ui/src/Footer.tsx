export function Footer({ name, maxWidth }: { name: string; maxWidth?: number }) {
  return (
    <div className="border-t border-border">
      <div
        className="mx-auto px-6 py-5 text-[12.5px] text-foreground-muted"
        style={maxWidth ? { maxWidth } : undefined}
      >
        © {new Date().getFullYear()} {name}
      </div>
    </div>
  );
}
