'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/profile';

/**
 * Project 섹션 컴포넌트
 * - 프로젝트 캐러셀
 */
export default function ProjectSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openDemo, setOpenDemo] = useState<{
        url: string;
        page: number;
        title: string;
    } | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentIndex];

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
                    <p className="text-foreground-secondary">
                        수행한 프로젝트입니다.
                    </p>
                </motion.div>

                {/* 프로젝트 캐러셀 */}
                <div className="relative">
                    {/* 캐러셀 카드 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            className="card section-card p-8 md:p-12"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* 왼쪽: 프로젝트 이미지 */}
                                <div className="md:w-1/3">
                                <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px] flex items-center justify-center p-2">
                                    {currentProject.image ? (
                                        <Image
                                            src={currentProject.image}
                                            alt={`${currentProject.title} preview`}
                                            width={480}
                                            height={480}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-6xl">🚀</span>
                                    )}
                                </div>
                                </div>

                                {/* 오른쪽: 프로젝트 정보 */}
                                <div className="md:w-2/3 flex flex-col">
                                    {/* 프로젝트 제목 */}
                                    <h3 className="text-2xl font-bold text-foreground mb-3">
                                        {currentProject.title}
                                    </h3>

                                    {/* 프로젝트 설명 */}
                                    <p className="text-foreground-secondary leading-relaxed mb-6">
                                        {currentProject.description}
                                    </p>

                                    {/* 프로젝트 상세 */}
                                    {currentProject.highlights && (
                                        <div className="space-y-3 mb-6">
                                            {currentProject.highlights.map((item) => (
                                                <div key={item.label} className="flex flex-col">
                                                    <span className="text-sm font-semibold text-accent-primary">
                                                        {item.label}
                                                    </span>
                                                    <span className="text-foreground-secondary">
                                                        {item.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 태그 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {currentProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 text-sm bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 링크 */}
                                    <div className="flex gap-4">
                                        {currentProject.links?.demo && (
                                            <motion.button
                                                type="button"
                                                onClick={() =>
                                                    setOpenDemo({
                                                        url: currentProject.links?.demo ?? '',
                                                        page: currentProject.links?.demoPage ?? 1,
                                                        title: currentProject.title,
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
                                        {currentProject.links?.github && (
                                            <motion.a
                                                href={currentProject.links.github}
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
                    </AnimatePresence>

                    {/* 네비게이션 버튼 */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <motion.button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full bg-background-card border border-border
                flex items-center justify-center text-foreground-secondary
                hover:text-accent-primary hover:border-accent-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        {/* 인디케이터 */}
                        <div className="flex gap-2">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'w-6 bg-accent-primary'
                                            : 'bg-foreground-muted/30 hover:bg-foreground-muted/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full bg-background-card border border-border
                flex items-center justify-center text-foreground-secondary
                hover:text-accent-primary hover:border-accent-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
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
