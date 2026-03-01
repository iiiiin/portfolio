"use client";

import { useEffect } from "react";

const MERMAID_PREFIX_PATTERN =
  /^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|requirementDiagram|architecture|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)\b/m;

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

      const figureLanguage = (figure.getAttribute("data-language") ?? "").toLowerCase();
      const preLanguage = (pre.getAttribute("data-language") ?? "").toLowerCase();
      const className = code.className.toLowerCase();
      const codeText = (code.textContent ?? "").trimStart();
      const isMermaid =
        figureLanguage === "mermaid" ||
        preLanguage === "mermaid" ||
        className.includes("language-mermaid") ||
        MERMAID_PREFIX_PATTERN.test(codeText);

      if (isMermaid) {
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
          button.textContent = "✔ Copied";
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
