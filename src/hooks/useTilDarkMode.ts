"use client";

import { useSyncExternalStore } from "react";
import { LIGHT_THEME, DARK_THEME, TIL_DARK_MODE_KEY } from "@/lib/til-theme";

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
  const stored = localStorage.getItem(TIL_DARK_MODE_KEY);
  if (stored !== null) return stored === "1";
  return getMediaQuery().matches;
}

function getServerSnapshot() {
  return false;
}

export function useTilDarkMode() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDarkMode = (next: boolean) => {
    localStorage.setItem(TIL_DARK_MODE_KEY, next ? "1" : "0");
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  return { dark, theme, setDarkMode };
}
