'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';
import type { Locale } from '@/components/PortfolioClient';

const copy: Record<Locale, {
    title: string;
    subtitle: string;
    prev: string;
    next: string;
}> = {
    ko: {
        title: '권인입니다.',
        subtitle: '필요한 것을 만들기 위해 배우고, 직접 구현합니다.',
        prev: '이전 프로젝트',
        next: '다음 프로젝트',
    },
    en: {
        title: 'I’m In Kwon.',
        subtitle: 'I learn and build directly to make what is needed.',
        prev: 'Previous project',
        next: 'Next project',
    },
    jp: {
        title: 'Kwon Inです。',
        subtitle: '必要なものをつくるために学び、直接実装します。',
        prev: '前のプロジェクト',
        next: '次のプロジェクト',
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
    const orderedProjects = projects;
    const projectCount = orderedProjects.length;
    const [slideIndex, setSlideIndex] = useState(projectCount * 2 - 1);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const carouselProjects = [
        ...orderedProjects,
        ...orderedProjects,
        ...orderedProjects,
    ];

    const handlePrev = () => {
        setIsTransitionEnabled(true);
        setSlideIndex((current) => current - 1);
    };

    const handleNext = () => {
        setIsTransitionEnabled(true);
        setSlideIndex((current) => current + 1);
    };

    const handleTrackTransitionEnd = () => {
        if (slideIndex >= projectCount * 2) {
            setIsTransitionEnabled(false);
            setSlideIndex(projectCount);

            requestAnimationFrame(() => {
                setIsTransitionEnabled(true);
            });
        }

        if (slideIndex < projectCount) {
            setIsTransitionEnabled(false);
            setSlideIndex(projectCount * 2 - 1);

            requestAnimationFrame(() => {
                setIsTransitionEnabled(true);
            });
        }
    };

    return (
        <>
            <h1 className="sr-only">
                권인 포트폴리오
            </h1>
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

                <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-x-3 items-center justify-center text-foreground-secondary transition-colors hover:text-foreground md:-translate-x-16"
                    aria-label={heroCopy.prev}
                >
                    <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 z-10 inline-flex h-12 w-12 translate-x-3 items-center justify-center text-foreground-secondary transition-colors hover:text-foreground md:translate-x-16"
                    aria-label={heroCopy.next}
                >
                    <ChevronRight className="h-7 w-7" />
                </button>

                <div className="project-carousel mt-5 min-h-0 flex-1 overflow-hidden md:mt-8">
                    <div
                        className={`flex h-full ${isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
                        style={{
                            transform: `translateX(calc(${slideIndex} * -100% / var(--project-visible-count)))`,
                        }}
                        onTransitionEnd={handleTrackTransitionEnd}
                    >
                        {carouselProjects.map((project, projectIndex) => {
                            const frameType = frameByType[project.displayType ?? 'web'];
                            const originalIndex = projectIndex % projectCount;

                            return (
                                <article
                                    key={`${project.id}-${projectIndex}`}
                                    className="project-carousel-item min-h-0 shrink-0"
                                >
                                    <div className="project-mockup-stage">
                                        <div className={`device-frame device-frame-${frameType}`}>
                                            <div className="device-frame-screen">
                                                {/* TODO: Replace with final project screenshot */}
                                                {project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title} preview placeholder`}
                                                        width={520}
                                                        height={680}
                                                        className="h-full w-full object-cover"
                                                        priority={originalIndex === 0}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </>
    );
}
