'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ContactSection from '@/components/sections/ContactSection';
import type { WordPressPost } from '@/lib/wordpress';

export type Locale = 'ko' | 'en' | 'jp';

const STORAGE_KEY = 'portfolio-locale';

const footerCopy: Record<Locale, string> = {
    ko: '© 2026. Kwon In. All rights reserved.',
    en: '© 2026. Kwon In. All rights reserved.',
    jp: '© 2026. Kwon In. All rights reserved.',
};

function getInitialLocale(): Locale {
    if (typeof window === 'undefined') {
        return 'ko';
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ko' || stored === 'en' || stored === 'jp') {
        return stored;
    }

    const browser = navigator.language.toLowerCase();
    if (browser.startsWith('ja')) {
        return 'jp';
    }
    if (browser.startsWith('en')) {
        return 'en';
    }

    return 'ko';
}

interface PortfolioClientProps {
    latestPosts: WordPressPost[];
}

export default function PortfolioClient({ latestPosts }: PortfolioClientProps) {
    const [locale, setLocale] = useState<Locale>(getInitialLocale);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, locale);
        document.documentElement.lang = locale === 'jp' ? 'ja' : locale;
    }, [locale]);

    return (
        <main className="min-h-screen bg-background">
            <section className="px-4 pt-2">
                <div className="mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col">
                    <Header locale={locale} setLocale={setLocale} />
                    <HeroSection locale={locale} />
                </div>
            </section>
            <ProjectSection locale={locale} latestPosts={latestPosts} />
            <ContactSection locale={locale} />

            <footer className="border-t border-gray-200 py-8 text-center">
                <p className="text-sm text-foreground-muted">
                    {footerCopy[locale]}
                </p>
            </footer>
        </main>
    );
}
