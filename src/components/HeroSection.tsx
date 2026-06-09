'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { projects, type Project } from '@/data/profile';
import type { Locale } from '@/types/locale';
import ProjectDetail from '@/components/ProjectDetail';

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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [exitingId, setExitingId] = useState<string | null>(null);

    const handleSelect = (project: Project) => {
        setExitingId(project.id);
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
        setExitingId(null);
    };

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

                <div className="project-carousel relative mt-5 min-h-0 flex-1 overflow-hidden md:mt-8">
                    <div className="flex h-full">

                        <AnimatePresence mode="popLayout" initial={false}>
                            {visibleProjects
                                .filter(p => !selectedProject || p.id === selectedProject.id)
                                .map((project, index) => {
                                    const isSelected = selectedProject?.id === project.id;
                                    const frameType = frameByType[project.displayType ?? 'web'];

                                    return (
                                        <motion.article
                                            key={isSelected ? `${project.id}-detail` : project.id}
                                            className={`group flex min-h-0 flex-col ${
                                                isSelected
                                                    ? 'relative z-10 w-1/3 shrink-0 pr-4'
                                                    : 'project-carousel-item shrink-0 cursor-pointer'
                                            }`}
                                            initial={isSelected ? { opacity: 0, y: 20 } : { opacity: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={
                                                isSelected
                                                    ? { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
                                                    : project.id === exitingId
                                                    ? { opacity: 0, y: 30, transition: { duration: 0.2 } }
                                                    : { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
                                            }
                                            transition={isSelected ? { duration: 0.3, delay: 0.12 } : { duration: 0.2 }}
                                            onClick={!isSelected ? () => handleSelect(project) : undefined}
                                            whileHover={!isSelected && !selectedProject ? { y: -8 } : undefined}
                                        >
                                            <div
                                                className="project-mockup-stage"
                                                style={isSelected ? { alignItems: 'flex-start', paddingTop: '1.5rem' } : undefined}
                                            >
                                                <div className="flex flex-col items-center gap-3 pb-12">
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
                                                            {!isSelected && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                                                                    <ArrowUpRight className="h-7 w-7 text-white drop-shadow" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {!isSelected && (
                                                        <div className="text-center">
                                                            <p className="text-base font-semibold text-foreground">
                                                                {project.title[locale]}
                                                            </p>
                                                            <p className="mt-0.5 text-sm leading-relaxed text-foreground-secondary">
                                                                {project.description[locale]}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                        </AnimatePresence>

                        <AnimatePresence initial={false}>
                            {selectedProject && (
                                <motion.div
                                    key="detail-panel"
                                    className="relative z-10 min-w-0 flex-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
                                    transition={{ delay: 0.22, duration: 0.25 }}
                                >
                                    <ProjectDetail
                                        project={selectedProject}
                                        locale={locale}
                                        onClose={handleClose}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </motion.div>
        </>
    );
}
