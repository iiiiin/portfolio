'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';
import type { Locale } from '@/types/locale';

const copy: Record<Locale, { title: string; subtitle: string }> = {
    ko: {
        title: '권인입니다.',
        subtitle: '필요한 것을 만들기 위해 배우고, 직접 구현합니다.',
    },
    en: {
        title: "I'm In Kwon.",
        subtitle: 'I learn and build directly to make what is needed.',
    },
    jp: {
        title: 'Kwon Inです。',
        subtitle: '必要なものをつくるために学び、直接実装します。',
    },
};

const frameByType = {
    app: 'phone',
    'chrome-ext': 'browser',
    web: 'laptop',
} as const;

interface HeroSectionProps {
    locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
    const heroCopy = copy[locale];
    const visibleProjects = projects.filter(p => p.visible !== false);

    return (
        <>
            <h1 className="sr-only">권인 포트폴리오</h1>
            <motion.div
                className="relative flex min-h-0 flex-1 flex-col py-6 md:py-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                            {heroCopy.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-secondary md:text-xl md:leading-8">
                            {heroCopy.subtitle}
                        </p>
                    </div>
                </div>

                <div className="project-carousel mt-5 min-h-0 flex-1 overflow-hidden md:mt-8">
                    <div className="flex h-full">
                        {visibleProjects.map((project, index) => {
                            const frameType = frameByType[project.displayType ?? 'web'];

                            return (
                                <motion.article
                                    key={project.id}
                                    className="project-carousel-item group flex min-h-0 shrink-0 cursor-pointer flex-col"
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                >
                                    <div className="project-mockup-stage">
                                        <div className={`device-frame device-frame-${frameType}`}>
                                            <span className="device-frame-control device-frame-control-volume" aria-hidden="true" />
                                            <span className="device-frame-control device-frame-control-hold" aria-hidden="true" />
                                            <div className="device-frame-screen">
                                                {project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title[locale]} preview`}
                                                        width={520}
                                                        height={680}
                                                        className="h-full w-full object-cover"
                                                        priority={index === 0}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 px-1 text-center">
                                        <div className="flex items-center justify-center gap-0.5">
                                            <span className="text-sm font-semibold text-foreground">
                                                {project.title[locale]}
                                            </span>
                                            <ArrowUpRight className="h-3.5 w-3.5 translate-y-px text-foreground-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                        </div>
                                        <p className="mt-0.5 text-xs leading-relaxed text-foreground-secondary">
                                            {project.description[locale]}
                                        </p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </>
    );
}
