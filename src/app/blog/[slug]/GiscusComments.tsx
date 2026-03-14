"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { SITE_CONFIG } from "@/lib/constants";

export default function GiscusComments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-8">
      <Giscus
        repo={SITE_CONFIG.giscus.repo}
        repoId={SITE_CONFIG.giscus.repoId}
        category={SITE_CONFIG.giscus.category}
        categoryId={SITE_CONFIG.giscus.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
