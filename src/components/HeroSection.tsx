'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/data/profile';
import type { Locale } from '@/components/PortfolioClient';

const copy: Record<Locale, {
    role: string;
    title: string;
    subtitle: string;
    cta: string;
    social: { blog: string; email: string; };
}> = {
    ko: {
        role: 'Software Engineer',
        title: '안녕하세요, 권인입니다.',
        subtitle: '필요한 것을 만들기 위해 배우고, 구현합니다.',
        cta: '프로젝트 보기',
        social: { blog: 'Blog', email: 'Email' },
    },
    en: {
        role: 'Software Engineer',
        title: 'Hi, I’m In Kwon.',
        subtitle: 'I learn and build to make what is needed.',
        cta: 'View Projects',
        social: { blog: 'Blog', email: 'Email' },
    },
    jp: {
        role: 'Software Engineer',
        title: 'こんにちは、Kwon Inです。',
        subtitle: '必要なものをつくるために学び、実装します。',
        cta: 'プロジェクトを見る',
        social: { blog: 'Blog', email: 'Email' },
    },
};

interface HeroSectionProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export default function HeroSection({ locale, setLocale }: HeroSectionProps) {
    const heroCopy = copy[locale];

    const scrollToProjects = () => {
        window.scrollTo({
            top: window.innerHeight * 0.95,
            behavior: 'smooth',
        });
    };

    const socialLinks = [
        profile.github
            ? { href: profile.github, label: 'GitHub', icon: Github }
            : null,
        profile.linkedin
            ? { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin }
            : null,
        profile.blog
            ? { href: profile.blog, label: heroCopy.social.blog, icon: BookOpen }
            : null,
        { href: `mailto:${profile.email}`, label: heroCopy.social.email, icon: Mail },
    ].filter((item): item is { href: string; label: string; icon: typeof Github } => item !== null);

    return (
        <section className="px-4 pt-2">
            <div className="mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col">
                <motion.header
                    className="flex items-center justify-between border-b border-border py-6"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center"
                        aria-label="홈으로 이동"
                    >
                        <Image
                            src={profile.headerLogoUrl}
                            alt={`${profile.name} home logo`}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-xl object-cover"
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-2 text-sm font-medium text-foreground-secondary">
                        {(['ko', 'en', 'jp'] as const).map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setLocale(item)}
                                className={`rounded-full px-3 py-1.5 transition-colors ${locale === item
                                    ? 'bg-black text-white'
                                    : 'hover:bg-background-secondary hover:text-foreground'
                                    }`}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </motion.header>

                <h1 className="sr-only">
                    권인 포트폴리오
                </h1>
                <motion.div
                    className="grid flex-1 items-center gap-10 py-10 md:grid-cols-[280px_minmax(0,1fr)] md:py-12"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <div className="flex justify-center md:justify-start">
                        <div className="hero-avatar-frame">
                            <div className="hero-avatar-inner">
                                <Image
                                    src={profile.avatarUrl}
                                    alt={`${profile.name} avatar`}
                                    width={280}
                                    height={280}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl md:pt-8">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-foreground-muted">
                            {heroCopy.role}
                        </p>
                        <h2 className="text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-6xl">
                            {heroCopy.title}
                        </h2>
                        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground-secondary md:text-3xl md:leading-snug">
                            {heroCopy.subtitle}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <motion.button
                                type="button"
                                onClick={scrollToProjects}
                                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {heroCopy.cta}
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                        className="inline-flex items-center gap-2 text-base text-foreground-secondary transition-colors hover:text-foreground"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
