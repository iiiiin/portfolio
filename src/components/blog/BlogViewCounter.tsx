"use client";

import { useEffect, useState } from "react";

interface BlogViewCounterProps {
  slug: string;
}

export default function BlogViewCounter({ slug }: BlogViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function trackView() {
      try {
        const response = await fetch("/api/blog/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { views?: number };

        if (mounted && typeof data.views === "number") {
          setViews(data.views);
        }
      } catch {
        // 조회수 API 실패 시 UI 전체를 깨지 않게 조용히 무시
      }
    }

    trackView();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <span className="text-foreground-muted">
      조회수 {views !== null ? views.toLocaleString() : "-"}
    </span>
  );
}

