"use client";

import { useEffect } from "react";

type MermaidTheme = "default" | "dark";
interface MermaidRendererProps {
  slug: string;
}

const MERMAID_PREFIX_PATTERN =
  /^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|requirementDiagram|architecture|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)\b/m;

function getCodeElement(figure: HTMLElement) {
  return figure.querySelector("code");
}

function isMermaidFigure(figure: HTMLElement) {
  const pre = figure.querySelector("pre");
  const code = getCodeElement(figure);
  if (!pre || !code) {
    return false;
  }

  const figureLanguage = (figure.getAttribute("data-language") ?? "").toLowerCase();
  const preLanguage = (pre.getAttribute("data-language") ?? "").toLowerCase();
  const className = code.className.toLowerCase();
  const codeText = (code.textContent ?? "").trimStart();

  return (
    figureLanguage === "mermaid" ||
    preLanguage === "mermaid" ||
    className.includes("language-mermaid") ||
    MERMAID_PREFIX_PATTERN.test(codeText)
  );
}

function hashText(input: string) {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function scheduleIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 250 });
    return;
  }
  window.setTimeout(callback, 16);
}

export default function MermaidRenderer({ slug }: MermaidRendererProps) {
  useEffect(() => {
    let cancelled = false;
    let sequence = 0;
    let mermaidModulePromise: Promise<typeof import("mermaid")["default"]> | null = null;
    let processingQueue = false;
    const renderQueue: HTMLElement[] = [];
    const queued = new WeakSet<HTMLElement>();

    const getTheme = (): MermaidTheme =>
      document.documentElement.dataset.theme === "dark" ? "dark" : "default";

    const getMermaid = async () => {
      mermaidModulePromise ??= import("mermaid").then((module) => module.default);
      return mermaidModulePromise;
    };

    const renderFigure = async (figure: HTMLElement, theme: MermaidTheme) => {
      const sourceFromDataset = figure.dataset.mermaidSource;
      const sourceFromCode = getCodeElement(figure)?.textContent ?? "";
      const source = (sourceFromDataset ?? sourceFromCode).trim();

      if (!source || cancelled) {
        return;
      }

      figure.dataset.mermaidSource = source;
      const cacheKey = `mermaid:${slug}:${theme}:${hashText(source)}`;

      try {
        const cachedSvg = sessionStorage.getItem(cacheKey);
        if (cachedSvg) {
          const pre = figure.querySelector("pre");
          if (pre) {
            pre.innerHTML = "";
            const diagram = document.createElement("div");
            diagram.className = "mermaid-diagram";
            diagram.innerHTML = cachedSvg;
            pre.appendChild(diagram);
            figure.dataset.mermaidRendered = "true";
            figure.dataset.mermaidTheme = theme;
          }
          return;
        }

        const mermaid = await getMermaid();
        if (cancelled) {
          return;
        }

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme,
        });

        const renderId = `mermaid-diagram-${Date.now()}-${sequence++}`;
        const { svg } = await mermaid.render(renderId, source);

        if (cancelled) {
          return;
        }

        const pre = figure.querySelector("pre");
        if (!pre) {
          return;
        }

        pre.innerHTML = "";
        const diagram = document.createElement("div");
        diagram.className = "mermaid-diagram";
        diagram.innerHTML = svg;
        pre.appendChild(diagram);

        sessionStorage.setItem(cacheKey, svg);
        figure.dataset.mermaidRendered = "true";
        figure.dataset.mermaidTheme = theme;
      } catch {
        // Mermaid 렌더링 실패 시 원본 코드블록은 유지
      }
    };

    const processQueue = () => {
      if (processingQueue || cancelled) {
        return;
      }

      processingQueue = true;
      const run = () => {
        if (cancelled) {
          processingQueue = false;
          return;
        }

        const figure = renderQueue.shift();
        if (!figure) {
          processingQueue = false;
          return;
        }

        const theme = getTheme();
        void renderFigure(figure, theme).finally(() => {
          scheduleIdle(run);
        });
      };

      scheduleIdle(run);
    };

    const mermaidFigures = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rehype-pretty-code-figure]")
    ).filter((figure) => isMermaidFigure(figure));

    if (mermaidFigures.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const figure = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            return;
          }
          observer.unobserve(figure);
          if (queued.has(figure)) {
            return;
          }
          queued.add(figure);
          renderQueue.push(figure);
        });
        processQueue();
      },
      { rootMargin: "240px 0px" }
    );

    mermaidFigures.forEach((figure) => {
      observer.observe(figure);
    });

    const html = document.documentElement;
    const themeObserver = new MutationObserver(() => {
      const theme = getTheme();
      mermaidFigures.forEach((figure) => {
        if (figure.dataset.mermaidRendered !== "true") {
          return;
        }
        if (figure.dataset.mermaidTheme === theme) {
          return;
        }
        void renderFigure(figure, theme);
      });
    });

    themeObserver.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, [slug]);

  return null;
}
