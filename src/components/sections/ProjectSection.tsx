'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Store } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';

const blogPlaceholders = [
    {
        title: '최신 블로그 글 1',
        description: '외부 블로그 이전 후 연결할 대표 글 자리입니다.',
    },
    {
        title: '최신 블로그 글 2',
        description: '프로젝트 회고나 기술 정리를 연결할 수 있습니다.',
    },
    {
        title: '최신 블로그 글 3',
        description: 'Flutter 관련 글을 우선 노출하는 용도로 사용할 수 있습니다.',
    },
];

export default function ProjectSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleProjects = projects
        .filter((project) => project.id !== 'review')
        .sort((a, b) => {
            const order = { app: 0, 'chrome-ext': 1, web: 2 } as const;
            const aOrder = order[a.displayType ?? 'web'];
            const bOrder = order[b.displayType ?? 'web'];
            return aOrder - bOrder;
        });
    const currentProject = visibleProjects[currentIndex];

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
                                프로젝트
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
                                        {currentProject.displayType === 'app' ? 'App' : 'Chrome Extension'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                        aria-label="이전 프로젝트"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-black hover:text-white"
                                        aria-label="다음 프로젝트"
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
                                        {currentProject.title}
                                    </h3>
                                    <p className="mt-3 text-base leading-7 text-foreground-secondary">
                                        {currentProject.description}
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
                                                    aria-label={`${project.title} 보기`}
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
                                블로그 최신 글
                            </h3>
                        </div>

                        <div className="card flex flex-1 flex-col p-6 md:p-7">
                            <div className="flex flex-1 flex-col gap-4">
                                {blogPlaceholders.map((item) => (
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
