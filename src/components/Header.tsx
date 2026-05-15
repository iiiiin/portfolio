'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/components/PortfolioClient';
import { profile } from '@/data/profile';

const locales = ['ko', 'en', 'jp'] as const;

interface HeaderProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export default function Header({ locale, setLocale }: HeaderProps) {
    const [isLocaleOpen, setIsLocaleOpen] = useState(false);
    const localeOptions = locales.filter((item) => item !== locale);

    const handleLocaleSelect = (nextLocale: Locale) => {
        setLocale(nextLocale);
        setIsLocaleOpen(false);
    };

    return (
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

            <div className="relative text-sm font-medium text-foreground-secondary">
                <button
                    type="button"
                    onClick={() => setIsLocaleOpen((current) => !current)}
                    className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1.5 text-white transition-colors hover:bg-neutral-800"
                    aria-expanded={isLocaleOpen}
                    aria-haspopup="menu"
                >
                    {locale.toUpperCase()}
                    <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${isLocaleOpen ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {isLocaleOpen ? (
                    <div
                        className="absolute right-0 top-full z-20 mt-2 flex min-w-full flex-col rounded-2xl border border-border bg-background p-1 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                        role="menu"
                    >
                        {localeOptions.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleLocaleSelect(item)}
                                className="rounded-full px-3 py-1.5 text-left transition-colors hover:bg-background-secondary hover:text-foreground"
                                role="menuitem"
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
        </motion.header>
    );
}
