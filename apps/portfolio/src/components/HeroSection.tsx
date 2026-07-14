'use client';

import { ExternalLink } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';
import { projects } from '@/data/profile';

const heroCopy = {
    title: 'Portfolio',
    subtitle: '기술 개발 경험을 정리한 포트폴리오입니다.',
};

// "**텍스트**" 구간만 굵게 표시 (하이라이트 문장 안에서 숫자 등 일부만 강조할 때 사용)
function renderWithBold(text: string) {
    return text.split(/(\*\*.+?\*\*)/g).map((part, i) => {
        const match = part.match(/^\*\*(.+)\*\*$/);
        return match ? (
            <strong key={i} className="font-semibold text-foreground">
                {match[1]}
            </strong>
        ) : (
            part
        );
    });
}

export default function HeroSection() {
    const visibleProjects = projects.filter((p) => p.visible !== false);

    return (
        <div className="mx-auto w-full max-w-[660px] px-6 pb-16 pt-14">
            <header className="mb-11">
                <h1 className="mb-2.5 text-[27px] font-semibold tracking-[-0.01em] text-foreground">
                    {heroCopy.title}
                </h1>
                <p className="max-w-[46ch] text-base leading-[1.6] text-foreground-muted">
                    {heroCopy.subtitle}
                </p>
            </header>

            <ul className="m-0 list-none p-0">
                {visibleProjects.map((project) => {
                    const hasGithub = !!project.links?.github;
                    const hasStore = !!project.links?.store;

                    return (
                        <li key={project.id} className="border-b border-border py-[26px]">
                            <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-foreground">
                                {project.title}
                            </h2>

                            {project.period && (
                                <p className="mt-1 text-xs text-foreground-muted">{project.period}</p>
                            )}

                            <p className="mt-3 text-[15.5px] leading-[1.6] text-foreground-secondary">
                                {project.description}
                            </p>

                            {project.role && (
                                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                                    {project.role}
                                </p>
                            )}

                            {project.highlights && (
                                <ul className="mt-4 list-none space-y-2 p-0">
                                    {project.highlights.map((highlight, i) => (
                                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground-secondary">
                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-muted" aria-hidden="true" />
                                            {renderWithBold(highlight)}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-background-secondary px-2.5 py-1 text-xs text-foreground-secondary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {(hasGithub || hasStore) && (
                                <div className="mt-4 flex gap-5">
                                    {hasGithub && (
                                        <a
                                            href={project.links!.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center text-xs font-medium text-foreground-secondary transition-colors hover:text-foreground"
                                            onClick={() => sendGAEvent('event', 'project_link_click', { project_id: project.id, link_type: 'github' })}
                                        >
                                            GitHub
                                            <ExternalLink className="ml-1 h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </a>
                                    )}
                                    {hasStore && (
                                        <a
                                            href={project.links!.store}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center text-xs font-medium text-foreground-secondary transition-colors hover:text-foreground"
                                            onClick={() => sendGAEvent('event', 'project_link_click', { project_id: project.id, link_type: 'store' })}
                                        >
                                            Store
                                            <ExternalLink className="ml-1 h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
