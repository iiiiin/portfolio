"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LIGHT_THEME, DARK_THEME, UI_DARK_MODE_STORAGE_KEY } from "./theme";

const getMediaQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function subscribe(callback: () => void) {
  const mq = getMediaQuery();
  window.addEventListener("storage", callback);
  mq.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mq.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  const stored = localStorage.getItem(UI_DARK_MODE_STORAGE_KEY);
  if (stored !== null) return stored === "1";
  return getMediaQuery().matches;
}

function getServerSnapshot() {
  return false;
}

export function useDarkMode() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const setDarkMode = (next: boolean) => {
    localStorage.setItem(UI_DARK_MODE_STORAGE_KEY, next ? "1" : "0");
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  return { dark, theme, setDarkMode };
}
