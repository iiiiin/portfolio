"use client";

import { useEffect } from "react";

export default function CodeBlockCopyEnhancer() {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>("[data-rehype-pretty-code-figure]");

    figures.forEach((figure) => {
      if (figure.dataset.copyReady === "true") {
        return;
      }

      const pre = figure.querySelector("pre");
      const code = figure.querySelector("code");
      if (!pre || !code) {
        return;
      }

      figure.dataset.copyReady = "true";
      figure.classList.add("code-block-wrap");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "코드 복사");

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent ?? "");
          button.textContent = "✓ Copied";
          window.setTimeout(() => {
            button.textContent = "Copy";
          }, 1200);
        } catch {
          button.textContent = "Failed";
          window.setTimeout(() => {
            button.textContent = "Copy";
          }, 1200);
        }
      });

      figure.appendChild(button);
    });
  }, []);

  return null;
}
