'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { Header as SharedHeader, DarkModeToggle, useDarkMode } from '@inkwon/ui';
import type { Locale } from '@/types/locale';
import { profile } from '@/data/profile';

const locales = ['ko', 'en', 'jp'] as const;
const FAVICON_LIGHT = '/favicon-light.png';
const FAVICON_DARK = '/favicon-dark.png';

interface HeaderProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export default function Header({ locale, setLocale }: HeaderProps) {
    const { dark } = useDarkMode();
    const [isLocaleOpen, setIsLocaleOpen] = useState(false);
    const localeOptions = locales.filter((item) => item !== locale);
    const socialLinks = [
        { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
        profile.github
            ? { href: profile.github, label: 'GitHub', icon: Github }
            : null,
        profile.linkedin
            ? { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin }
            : null,
        profile.blog
            ? { href: profile.blog, label: '문서', icon: FileText }
            : null,
    ].filter((item): item is { href: string; label: string; icon: typeof Mail } => item !== null);

    const handleLocaleSelect = (nextLocale: Locale) => {
        setLocale(nextLocale);
        setIsLocaleOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <link rel="icon" href={dark ? FAVICON_DARK : FAVICON_LIGHT} sizes="any" />
            <SharedHeader
                homeHref="/"
                logoSrc={profile.headerLogoUrl}
                logoAlt={`${profile.name} home logo`}
                sticky={false}
                className="border-b border-border"
                containerClassName="py-6"
                maxWidth={660}
                logoSize={44}
                logoClassName="rounded-xl"
                rightSlot={
                    <>
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border bg-background-secondary">
                            <Image
                                src={profile.avatarUrl}
                                alt={`${profile.name} profile`}
                                width={36}
                                height={36}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex items-center gap-1">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
                                        aria-label={item.label}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>

                        <DarkModeToggle />

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
                    </>
                }
            />
        </motion.div>
    );
}
