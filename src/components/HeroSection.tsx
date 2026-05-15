'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, Store } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';
import type { Locale } from '@/components/PortfolioClient';

const copy: Record<Locale, {
    title: string;
    subtitle: string;
    prev: string;
    next: string;
    openSource: string;
    openStore: string;
}> = {
    ko: {
        title: '권인입니다.',
        subtitle: '필요한 것을 만들기 위해 배우고, 직접 구현합니다.',
        prev: '이전 프로젝트',
        next: '다음 프로젝트',
        openSource: 'GitHub 열기',
        openStore: '스토어 열기',
    },
    en: {
        title: 'I’m In Kwon.',
        subtitle: 'I learn and build directly to make what is needed.',
        prev: 'Previous project',
        next: 'Next project',
        openSource: 'Open GitHub',
        openStore: 'Open store',
    },
    jp: {
        title: 'Kwon Inです。',
        subtitle: '必要なものをつくるために学び、直接実装します。',
        prev: '前のプロジェクト',
        next: '次のプロジェクト',
        openSource: 'GitHubを開く',
        openStore: 'ストアを開く',
    },
};

const projectCopy: Record<Locale, Record<string, { title: string; description: string }>> = {
    ko: {
        pawprint: { title: 'PAWPRINT', description: '반려동물 건강 분석/활동량 관리 서비스' },
        review: { title: 'RE:VIEW', description: 'AI 면접 코칭 피드백 웹 서비스' },
        'turtleneck-reminder': { title: '거북목 알리미', description: '브라우저 사용 시간 기반 자세 교정 리마인더' },
        'lunch-hourglass': { title: '배꼽시계', description: '점심까지 남은 시간을 픽셀 버거로 시각화' },
        'cocos-forest': { title: '코코의 숲', description: '소비내역 기반 탄소배출량 추적 앱' },
    },
    en: {
        pawprint: { title: 'PAWPRINT', description: 'Pet health analytics and activity tracking service.' },
        review: { title: 'RE:VIEW', description: 'AI interview coaching and feedback web service.' },
        'turtleneck-reminder': { title: 'Turtleneck Reminder', description: 'Posture reminders based on browser usage time.' },
        'lunch-hourglass': { title: 'Lunch Hourglass', description: 'A pixel burger countdown from work start to lunch.' },
        'cocos-forest': { title: 'Coco Forest', description: 'Carbon emission tracking app based on spending history.' },
    },
    jp: {
        pawprint: { title: 'PAWPRINT', description: 'ペットの健康分析と活動量管理サービスです。' },
        review: { title: 'RE:VIEW', description: 'AI面接コーチングとフィードバックのWebサービスです。' },
        'turtleneck-reminder': { title: '猫背リマインダー', description: 'ブラウザ利用時間に応じた姿勢改善リマインダーです。' },
        'lunch-hourglass': { title: 'ランチ時計', description: '昼休みまでの時間をピクセルバーガーで可視化します。' },
        'cocos-forest': { title: 'ココの森', description: '支出履歴をもとに炭素排出量を追跡するアプリです。' },
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
    const [activeIndex, setActiveIndex] = useState(0);
    const orderedProjects = projects;

    const handlePrev = () => {
        setActiveIndex((current) => (
            current === 0 ? orderedProjects.length - 1 : current - 1
        ));
    };

    const handleNext = () => {
        setActiveIndex((current) => (
            current === orderedProjects.length - 1 ? 0 : current + 1
        ));
    };

    const visibleProjects = Array.from({ length: 3 }, (_, offset) => {
        const index = (activeIndex + offset) % orderedProjects.length;

        return orderedProjects[index];
    });

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

                <div className="mt-5 min-h-0 flex-1 overflow-hidden md:mt-8">
                    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProjects.map((project, visibleIndex) => {
                            const text = projectCopy[locale][project.id] ?? {
                                title: project.title,
                                description: project.description,
                            };
                            const frameType = frameByType[project.displayType ?? 'web'];

                            return (
                                <motion.article
                                    key={`${activeIndex}-${project.id}`}
                                    className={`min-h-0 flex-col justify-between rounded-lg border border-border bg-background-secondary p-4 ${visibleIndex === 0
                                        ? 'flex'
                                        : visibleIndex === 1
                                            ? 'hidden sm:flex'
                                            : 'hidden lg:flex'
                                        }`}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: visibleIndex * 0.04 }}
                                >
                                    <div className="min-h-0 flex-1">
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
                                                        priority={visibleIndex === 0}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 shrink-0">
                                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                                            {project.displayType === 'chrome-ext' ? 'Extension' : project.displayType ?? 'Web'}
                                        </p>
                                        <div className="mt-2 flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-foreground">
                                                    {text.title}
                                                </h3>
                                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-foreground-secondary">
                                                    {text.description}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 gap-1">
                                                {project.links?.github ? (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                                        aria-label={heroCopy.openSource}
                                                    >
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                ) : null}
                                                {project.links?.store ? (
                                                    <a
                                                        href={project.links.store}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                                        aria-label={heroCopy.openStore}
                                                    >
                                                        <Store className="h-4 w-4" />
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
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
