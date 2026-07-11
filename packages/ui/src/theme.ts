export const LIGHT_THEME = {
  bg: "#faf9f7",
  text: "#232220",
  textSoft: "#4c4944",
  muted: "#9a968f",
  border: "#e6e3de",
  borderStrong: "#d3cfc8",
  borderSoft: "#eeece8",
  accent: "#5f7a52",
  chipBg: "transparent",
  chipText: "#6b6862",
  chipBorder: "#e6e3de",
  noteBg: "#f1efec",
  mermaidBg: "#ffffff",
};

export const DARK_THEME = {
  bg: "#1c1b19",
  text: "#ece9e4",
  textSoft: "#c7c3bc",
  muted: "#8b877f",
  border: "#332f2a",
  borderStrong: "#433e37",
  borderSoft: "#2c2924",
  accent: "#9cc084",
  chipBg: "transparent",
  chipText: "#a19c93",
  chipBorder: "#3a3631",
  noteBg: "#262420",
  mermaidBg: "#221f1c",
};

export type UiTheme = typeof LIGHT_THEME;

export const UI_DARK_MODE_STORAGE_KEY = "ui-dark-mode";
