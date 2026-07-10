'use client';

import { Github, ExternalLink, ChevronLeft } from 'lucide-react';
import type { Project } from '@/data/profile';
import type { Locale } from '@/types/locale';

interface ProjectDetailProps {
    project: Project;
    locale: Locale;
    onClose: () => void;
}

export default function ProjectDetail({ project, locale, onClose }: ProjectDetailProps) {
    const hasGithub = !!project.links?.github;
    const hasStore = !!project.links?.store;

    return (
        <div className="flex h-full flex-col pt-6 pl-8">
            {/* 타이틀 + 백 애로우 */}
            <div className="flex items-center gap-1">
                <button
                    onClick={onClose}
                    className="group shrink-0 p-1 text-foreground-secondary transition-colors hover:text-foreground"
                    aria-label="돌아가기"
                >
                    <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <h2 className="text-2xl font-bold text-foreground">{project.title[locale]}</h2>
            </div>

            {/* 기간 — 타이틀 바로 아래, 왼쪽 정렬 */}
            {project.period && (
                <p className="mt-1 pl-[30px] text-sm text-foreground-muted">{project.period}</p>
            )}

            {/* 역할 */}
            {project.role?.[locale] && (
                <p className="mt-3 pl-[30px] text-base text-foreground-secondary">{project.role[locale]}</p>
            )}

            <div className="my-5 h-px bg-border" />

            {/* 하이라이트 */}
            {project.highlights?.[locale] && (
                <ul className="space-y-4 pl-[30px]">
                    {project.highlights[locale].map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground-secondary">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-muted" aria-hidden="true" />
                            {h}
                        </li>
                    ))}
                </ul>
            )}

            <div className="my-5 h-px bg-border" />

            {/* 태그 */}
            <div className="flex flex-wrap gap-1.5 pl-[30px]">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-background-secondary px-2.5 py-1 text-xs text-foreground-secondary"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* 링크 */}
            {(hasGithub || hasStore) && (
                <div className="mt-6 flex gap-2 pl-[30px]">
                    {hasGithub && (
                        <a
                            href={project.links!.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:border-foreground-muted hover:text-foreground"
                        >
                            <Github className="h-3.5 w-3.5" />
                            GitHub
                        </a>
                    )}
                    {hasStore && (
                        <a
                            href={project.links!.store}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:border-foreground-muted hover:text-foreground"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Store
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
