'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

export type Locale = 'ko' | 'en' | 'jp';

const STORAGE_KEY = 'portfolio-locale';

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

export default function PortfolioClient() {
    const [locale, setLocale] = useState<Locale>(getInitialLocale);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, locale);
        document.documentElement.lang = locale === 'jp' ? 'ja' : locale;
    }, [locale]);

    return (
        <main className="h-dvh overflow-hidden bg-background">
            <section className="h-full px-4 pt-2">
                <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                    <Header locale={locale} setLocale={setLocale} />
                    <HeroSection locale={locale} />
                </div>
            </section>
        </main>
    );
}
