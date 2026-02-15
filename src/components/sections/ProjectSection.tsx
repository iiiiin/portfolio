'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Github } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';

/**
 * Project 섹션 컴포넌트
 * - 프로젝트 그리드
 */
export default function ProjectSection() {
    const [openDemo, setOpenDemo] = useState<{
        url: string;
        page: number;
        title: string;
    } | null>(null);

    useEffect(() => {
        if (!openDemo) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDemo(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [openDemo]);

    const reviewProject = projects.find((project) => project.id === 'review');
    const mobileProjects = projects.filter((project) => project.id !== 'review');

    return (
        <section id="project" className="py-20 px-4 bg-background-secondary">
            <div className="max-w-6xl mx-auto">
                {/* 섹션 헤더 */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Project</span>
                    </h2>
                </motion.div>

                {/* 1행: RE:VIEW 카드 1개 (풀폭 가로형) */}
                {reviewProject ? (
                    <motion.div
                        className="card mb-6 p-6 md:p-7"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex h-full flex-col gap-6 md:flex-row">
                            <div className="md:w-[260px] md:shrink-0 flex items-center justify-center">
                                {reviewProject.image ? (
                                    <Image
                                        src={reviewProject.image}
                                        alt={`${reviewProject.title} preview`}
                                        width={280}
                                        height={180}
                                        className="h-auto w-full max-w-[260px] object-contain"
                                    />
                                ) : (
                                    <span className="text-6xl">🚀</span>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col">
                                <h3 className="text-2xl font-bold text-foreground mb-2">{reviewProject.title}</h3>
                                <p className="text-foreground-secondary leading-relaxed mb-5">{reviewProject.description}</p>

                                {reviewProject.highlights && (
                                    <div className="space-y-2 mb-5">
                                        {reviewProject.highlights.map((item) => (
                                            <div key={`${reviewProject.id}-hero-${item.label}`} className="flex flex-col">
                                                <span className="text-sm font-semibold text-accent-primary">{item.label}</span>
                                                <span className="text-sm text-foreground-secondary">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mb-5 flex flex-wrap gap-2">
                                    {reviewProject.tags.map((tag) => (
                                        <span
                                            key={`${reviewProject.id}-hero-${tag}`}
                                            className="px-3 py-1.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-wrap gap-3">
                                    {reviewProject.links?.demo && (
                                        <motion.button
                                            type="button"
                                            onClick={() =>
                                                setOpenDemo({
                                                    url: reviewProject.links?.demo ?? '',
                                                    page: reviewProject.links?.demoPage ?? 1,
                                                    title: reviewProject.title,
                                                })
                                            }
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-accent-primary text-white font-medium
                        hover:bg-accent-secondary transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FileText className="w-4 h-4" />
                                            PDF
                                        </motion.button>
                                    )}
                                    {reviewProject.links?.github && (
                                        <motion.a
                                            href={reviewProject.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-background-secondary border border-border
                        text-foreground-secondary hover:text-foreground
                        transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : null}

                {/* 2행: RE:VIEW 카드 2개 (앱 카드와 동일한 가로형) */}
                {reviewProject ? (
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[0, 1].map((duplicateIndex) => (
                            <motion.div
                                key={`review-horizontal-copy-${duplicateIndex}`}
                                className="card p-6 md:p-7 h-full"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: duplicateIndex * 0.05 }}
                            >
                                <div className="flex h-full flex-col gap-6 sm:flex-row">
                                    <div className="sm:w-[180px] sm:shrink-0 flex items-start justify-center">
                                        {reviewProject.image ? (
                                            <Image
                                                src={reviewProject.image}
                                                alt={`${reviewProject.title} preview`}
                                                width={180}
                                                height={320}
                                                className="h-auto w-[140px] sm:w-[160px] object-contain"
                                            />
                                        ) : (
                                            <span className="text-5xl">🚀</span>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">{reviewProject.title}</h3>
                                        <p className="text-foreground-secondary leading-relaxed mb-5">{reviewProject.description}</p>

                                        {reviewProject.highlights && (
                                            <div className="space-y-2 mb-5">
                                                {reviewProject.highlights.map((item) => (
                                                    <div key={`${reviewProject.id}-horizontal-${duplicateIndex}-${item.label}`} className="flex flex-col">
                                                        <span className="text-sm font-semibold text-accent-primary">{item.label}</span>
                                                        <span className="text-sm text-foreground-secondary">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {reviewProject.tags.map((tag) => (
                                                <span
                                                    key={`${reviewProject.id}-horizontal-${duplicateIndex}-${tag}`}
                                                    className="px-3 py-1.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex flex-wrap gap-3">
                                            {reviewProject.links?.demo && (
                                                <motion.button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenDemo({
                                                            url: reviewProject.links?.demo ?? '',
                                                            page: reviewProject.links?.demoPage ?? 1,
                                                            title: reviewProject.title,
                                                        })
                                                    }
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-accent-primary text-white font-medium
                        hover:bg-accent-secondary transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    PDF
                                                </motion.button>
                                            )}
                                            {reviewProject.links?.github && (
                                                <motion.a
                                                    href={reviewProject.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-background-secondary border border-border
                        text-foreground-secondary hover:text-foreground
                        transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : null}

                {/* 3행: 기존 앱 카드 2개 */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {mobileProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="card p-6 md:p-7 h-full"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className="flex h-full flex-col gap-6 sm:flex-row">
                                <div className="sm:w-[180px] sm:shrink-0 flex items-start justify-center">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} preview`}
                                            width={180}
                                            height={320}
                                            className="h-auto w-[140px] sm:w-[160px] object-contain"
                                        />
                                    ) : (
                                        <span className="text-5xl">🚀</span>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                                    <p className="text-foreground-secondary leading-relaxed mb-5">{project.description}</p>

                                    {project.highlights && (
                                        <div className="space-y-2 mb-5">
                                            {project.highlights.map((item) => (
                                                <div key={`${project.id}-${item.label}`} className="flex flex-col">
                                                    <span className="text-sm font-semibold text-accent-primary">{item.label}</span>
                                                    <span className="text-sm text-foreground-secondary">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={`${project.id}-${tag}`}
                                                className="px-3 py-1.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex flex-wrap gap-3">
                                        {project.links?.demo && (
                                            <motion.button
                                                type="button"
                                                onClick={() =>
                                                    setOpenDemo({
                                                        url: project.links?.demo ?? '',
                                                        page: project.links?.demoPage ?? 1,
                                                        title: project.title,
                                                    })
                                                }
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-accent-primary text-white font-medium
                        hover:bg-accent-secondary transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FileText className="w-4 h-4" />
                                                PDF
                                            </motion.button>
                                        )}
                                        {project.links?.github && (
                                            <motion.a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-background-secondary border border-border
                        text-foreground-secondary hover:text-foreground
                        transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {openDemo && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenDemo(null)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${openDemo.title} demo`}
                            className="w-full max-w-5xl h-[80vh] bg-background-card border border-border rounded-2xl overflow-hidden flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                <span className="text-sm text-foreground-secondary">
                                    {openDemo.title} • Demo PDF
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setOpenDemo(null)}
                                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="flex-1 bg-black/5">
                                <iframe
                                    title={`${openDemo.title} demo pdf`}
                                    src={`${openDemo.url}#page=${openDemo.page}`}
                                    className="w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
