import { SANS, type TilTheme } from "@/lib/til-theme";

export default function TilFooter({
  theme,
  maxWidth = 660,
}: {
  theme: TilTheme;
  maxWidth?: number;
}) {
  return (
    <div style={{ borderTop: `1px solid ${theme.border}` }}>
      <div
        style={{
          maxWidth,
          margin: "0 auto",
          padding: "20px 24px",
          fontFamily: SANS,
          fontSize: 12.5,
          color: theme.muted,
        }}
      >
        © {new Date().getFullYear()} In Kwon
      </div>
    </div>
  );
}
