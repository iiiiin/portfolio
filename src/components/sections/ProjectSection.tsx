'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Store } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from '@/components/PortfolioClient';
import { projects } from '@/data/profile';

const sectionCopy: Record<Locale, {
    projectTitle: string;
    blogTitle: string;
    app: string;
    extension: string;
    prev: string;
    next: string;
    openProject: (title: string) => string;
    placeholders: { title: string; description: string; }[];
}> = {
    ko: {
        projectTitle: '프로젝트',
        blogTitle: '블로그 최신 글',
        app: 'App',
        extension: 'Chrome Extension',
        prev: '이전 프로젝트',
        next: '다음 프로젝트',
        openProject: (title) => `${title} 보기`,
        placeholders: [
            { title: '최신 블로그 글 1', description: '외부 블로그 이전 후 연결할 대표 글 자리입니다.' },
            { title: '최신 블로그 글 2', description: '프로젝트 회고나 기술 정리를 연결할 수 있습니다.' },
            { title: '최신 블로그 글 3', description: 'Flutter 관련 글을 우선 노출하는 용도로 사용할 수 있습니다.' },
        ],
    },
    en: {
        projectTitle: 'Projects',
        blogTitle: 'Latest Posts',
        app: 'App',
        extension: 'Chrome Extension',
        prev: 'Previous project',
        next: 'Next project',
        openProject: (title) => `Open ${title}`,
        placeholders: [
            { title: 'Latest Post 1', description: 'A placeholder block for a featured article after the blog migration.' },
            { title: 'Latest Post 2', description: 'You can link a project retrospective or technical write-up here.' },
            { title: 'Latest Post 3', description: 'This slot can prioritize Flutter-focused articles later.' },
        ],
    },
    jp: {
        projectTitle: 'プロジェクト',
        blogTitle: '最新ブログ記事',
        app: 'App',
        extension: 'Chrome Extension',
        prev: '前のプロジェクト',
        next: '次のプロジェクト',
        openProject: (title) => `${title}を見る`,
        placeholders: [
            { title: '最新ブログ記事 1', description: '外部ブログ移行後に接続する代表記事のプレースホルダーです。' },
            { title: '最新ブログ記事 2', description: 'プロジェクト振り返りや技術記事をここにリンクできます。' },
            { title: '最新ブログ記事 3', description: '今後はFlutter関連の記事を優先表示する想定です。' },
        ],
    },
};

const projectTranslations: Record<Locale, Record<string, { title: string; description: string }>> = {
    ko: {
        pawprint: { title: 'PAWPRINT', description: '반려동물 건강 분석/활동량 관리 서비스' },
        'turtleneck-reminder': { title: '거북목 알리미', description: '브라우저 사용 시간 기반 자세 교정 리마인더 크롬 확장프로그램' },
        'lunch-hourglass': { title: '배꼽시계', description: '출근부터 점심까지 시간을 픽셀 버거 레이어로 시각화하는 크롬 확장프로그램' },
        'cocos-forest': { title: '코코의 숲', description: '소비내역 기반 탄소배출량 추적 앱' },
    },
    en: {
        pawprint: { title: 'PAWPRINT', description: 'A pet health analytics and activity tracking service.' },
        'turtleneck-reminder': { title: 'Turtleneck Reminder', description: 'A Chrome extension that reminds users to correct posture based on browser usage time.' },
        'lunch-hourglass': { title: 'Lunch Hourglass', description: 'A Chrome extension that visualizes the time until lunch with a pixel burger overlay.' },
        'cocos-forest': { title: 'Coco Forest', description: 'An app that tracks carbon emissions based on spending history.' },
    },
    jp: {
        pawprint: { title: 'PAWPRINT', description: 'ペットの健康分析と活動量管理を行うサービスです。' },
        'turtleneck-reminder': { title: '猫背リマインダー', description: 'ブラウザ利用時間に応じて姿勢改善を促すChrome拡張です。' },
        'lunch-hourglass': { title: 'ランチ時計', description: '昼休みまでの時間をピクセルバーガーで可視化するChrome拡張です。' },
        'cocos-forest': { title: 'ココの森', description: '支出履歴をもとに炭素排出量を追跡するアプリです。' },
    },
};

interface ProjectSectionProps {
    locale: Locale;
}

export default function ProjectSection({ locale }: ProjectSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const copy = sectionCopy[locale];
    const visibleProjects = projects
        .filter((project) => project.id !== 'review')
        .sort((a, b) => {
            const order = { app: 0, 'chrome-ext': 1, web: 2 } as const;
            const aOrder = order[a.displayType ?? 'web'];
            const bOrder = order[b.displayType ?? 'web'];
            return aOrder - bOrder;
        });
    const currentProject = visibleProjects[currentIndex];
    const translatedProject = projectTranslations[locale][currentProject.id] ?? {
        title: currentProject.title,
        description: currentProject.description,
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? visibleProjects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === visibleProjects.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="project" className="bg-background-secondary px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-stretch gap-8 lg:grid-cols-2">
                    <div className="flex flex-col">
                        <motion.div
                            className="mb-8 text-center"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
                                {copy.projectTitle}
                            </h2>
                        </motion.div>

                        <motion.article
                            key={currentProject.id}
                            className="card flex flex-1 flex-col p-6 md:p-7"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-1 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                                        {currentProject.displayType === 'app' ? copy.app : copy.extension}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                        aria-label={copy.prev}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                        aria-label={copy.next}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-6 sm:flex-row">
                                <div className="flex items-center justify-center sm:w-[170px] sm:shrink-0">
                                    {currentProject.image ? (
                                        <Image
                                            src={currentProject.image}
                                            alt={`${currentProject.title} preview`}
                                            width={190}
                                            height={220}
                                            className="h-auto w-[138px] object-contain sm:w-[158px]"
                                        />
                                    ) : (
                                        <span className="text-5xl">🚀</span>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                                        {translatedProject.title}
                                    </h3>
                                    <p className="mt-3 text-base leading-7 text-foreground-secondary">
                                        {translatedProject.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {currentProject.tags.map((tag) => (
                                            <span
                                                key={`${currentProject.id}-${tag}`}
                                                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground-secondary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {currentProject.links?.github ? (
                                            <motion.a
                                                href={currentProject.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                                whileHover={{ y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                aria-label="GitHub"
                                            >
                                                <Github className="h-4 w-4" />
                                            </motion.a>
                                        ) : null}
                                        {currentProject.links?.store ? (
                                            <motion.a
                                                href={currentProject.links.store}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                                whileHover={{ y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                aria-label="Store"
                                            >
                                                <Store className="h-4 w-4" />
                                            </motion.a>
                                        ) : null}
                                    </div>

                                    <div className="mt-auto pt-8">
                                        <div className="flex flex-wrap gap-2">
                                            {visibleProjects.map((project, index) => (
                                                <button
                                                    key={project.id}
                                                    type="button"
                                                    onClick={() => setCurrentIndex(index)}
                                                    className={`h-2.5 rounded-full transition-all ${index === currentIndex
                                                        ? 'w-8 bg-black'
                                                        : 'w-2.5 bg-black/20 hover:bg-black/40'
                                                        }`}
                                                    aria-label={copy.openProject(projectTranslations[locale][project.id]?.title ?? project.title)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    <motion.aside
                        className="flex h-full flex-col"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                    >
                        <div className="mb-8 text-center">
                            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
                                {copy.blogTitle}
                            </h3>
                        </div>

                        <div className="card flex flex-1 flex-col p-6 md:p-7">
                            <div className="flex flex-1 flex-col gap-4">
                                {copy.placeholders.map((item) => (
                                    <a
                                        key={item.title}
                                        href="#"
                                        onClick={(event) => event.preventDefault()}
                                        className="block rounded-xl bg-background p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-lg font-semibold text-foreground">
                                                    {item.title}
                                                </p>
                                                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-foreground-muted" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}
