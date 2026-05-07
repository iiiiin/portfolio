'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ContactSection from '@/components/sections/ContactSection';

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

export default function PortfolioClient() {
    const [locale, setLocale] = useState<Locale>(getInitialLocale);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, locale);
        document.documentElement.lang = locale === 'jp' ? 'ja' : locale;
    }, [locale]);

    return (
        <main className="min-h-screen bg-background">
            <HeroSection locale={locale} setLocale={setLocale} />
            <ProjectSection locale={locale} />
            <ContactSection locale={locale} />

            <footer className="border-t border-gray-200 py-8 text-center">
                <p className="text-sm text-foreground-muted">
                    {footerCopy[locale]}
                </p>
            </footer>
        </main>
    );
}
