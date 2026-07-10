'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import type { Locale } from '@/types/locale';

export type { Locale };

const STORAGE_KEY = 'portfolio-locale';

function getStoredLocale(): Locale {
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
    const [locale, setLocale] = useState<Locale>('ko');
    const [isLocaleReady, setIsLocaleReady] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setLocale(getStoredLocale());
            setIsLocaleReady(true);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!isLocaleReady) {
            return;
        }

        window.localStorage.setItem(STORAGE_KEY, locale);
        document.documentElement.lang = locale === 'jp' ? 'ja' : locale;
    }, [isLocaleReady, locale]);

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
