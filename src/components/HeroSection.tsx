'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronsDown } from 'lucide-react';
import { profile } from '@/data/profile';

/**
 * 히어로 섹션 컴포넌트
 * - 심플한 타이틀 중심 디자인
 * - 스크롤 유도 애니메이션
 */
export default function HeroSection() {
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth',
        });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
            {/* 배경 글로우 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="hero-glow" />
            </div>

            {/* 콘텐츠 */}
            <motion.div
                className="relative z-10 text-center max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* 타이틀 */}
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="gradient-text">{profile.hero.titleName}</span>
                    <span className="text-foreground"> {profile.hero.titleSuffix}</span>
                </motion.h1>

                {/* 서브타이틀 */}
                <motion.p
                    className="text-lg md:text-xl text-foreground-secondary mb-4 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {profile.hero.subtitle}
                </motion.p>

                <motion.p
                    className="text-base text-foreground-muted mb-8 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* {profile.hero.description} */}
                </motion.p>

                {/* CTA 버튼 */}
                <motion.button
                    onClick={scrollToContent}
                    className="group inline-flex items-center gap-2 px-10 py-4 rounded-full
            bg-gradient-to-r from-accent-primary/90 to-accent-tertiary/90
            text-white font-medium text-lg
            shadow-[0_18px_45px_rgba(124,101,255,0.25)]
            hover:shadow-[0_20px_55px_rgba(124,101,255,0.35)]
            transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {profile.hero.ctaLabel}
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </motion.button>
            </motion.div>

            {/* 스크롤 유도 아이콘 */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent-primary/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronsDown className="w-8 h-8" />
                </motion.div>
            </motion.div>
        </section>
    );
}
