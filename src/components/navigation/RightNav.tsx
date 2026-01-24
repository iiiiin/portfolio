'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { navSections } from '@/data/sections';

/**
 * 우측 Sticky 네비게이션 컴포넌트
 * - Profile, Project, Contact 섹션 네비게이션
 * - Scroll Spy 활성 상태 표시
 */
export default function RightNav() {
    const [activeId, setActiveId] = useState('profile');

    // Intersection Observer로 현재 섹션 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-30% 0px -60% 0px',
                threshold: 0,
            }
        );

        navSections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    // 섹션으로 스크롤
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // 맨 위로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <motion.aside
            className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="bg-background-card/90 backdrop-blur-lg rounded-2xl border border-border p-2 shadow-xl">
                {/* 네비게이션 목록 */}
                <nav className="space-y-2">
                    {navSections.map((section) => {
                        const IconComponent = section.icon;
                        const isActive = section.id === activeId;

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`
                  group relative flex items-center justify-center w-10 h-10 rounded-xl
                  transition-all duration-300 text-left
                  ${isActive
                                        ? 'bg-accent-primary/10 text-accent-primary'
                                        : 'hover:bg-background-secondary text-foreground-secondary hover:text-foreground'
                                    }
                `}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* 아이콘 */}
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isActive
                                            ? 'bg-accent-primary text-white'
                                            : 'bg-background-secondary group-hover:bg-accent-primary/10'
                                        }
                  `}
                                >
                                    <IconComponent className="w-5 h-5" />
                                </div>

                                {/* 툴팁 */}
                                <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-accent-primary px-3 py-1 text-xs font-medium text-white opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                                    {section.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </nav>

                {/* 맨 위로 버튼 */}
                <motion.button
                    onClick={scrollToTop}
                    className="group relative mt-3 w-10 h-10 flex items-center justify-center rounded-xl
            bg-background-secondary hover:bg-accent-primary/10 
            text-foreground-secondary hover:text-accent-primary
            transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <ChevronUp className="w-4 h-4" />
                    <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-accent-primary px-3 py-1 text-xs font-medium text-white opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                        TOP
                    </span>
                </motion.button>
            </div>
        </motion.aside>
    );
}
