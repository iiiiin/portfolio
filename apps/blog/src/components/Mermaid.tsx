"use client";

import { useEffect, useId, useRef } from "react";

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });
      mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="til-mermaid" />;
}