"use client";

import { useEffect, useRef } from "react";

interface GiscusCommentsProps {
  slug: string;
}

export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

    if (!repo || !repoId || !category || !categoryId) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);
  }, [slug]);

  const isConfigured =
    Boolean(process.env.NEXT_PUBLIC_GISCUS_REPO) &&
    Boolean(process.env.NEXT_PUBLIC_GISCUS_REPO_ID) &&
    Boolean(process.env.NEXT_PUBLIC_GISCUS_CATEGORY) &&
    Boolean(process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID);

  return (
    <section className="mt-14 border-t border-border pt-8">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Comments</h2>
      {!isConfigured ? (
        <p className="text-sm text-foreground-muted">
          Giscus 환경변수를 설정하면 댓글이 표시됩니다.
        </p>
      ) : null}
      <div ref={ref} />
    </section>
  );
}

