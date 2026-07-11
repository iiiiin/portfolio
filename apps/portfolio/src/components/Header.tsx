'use client';

import { motion } from 'framer-motion';
import { BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { Header as SharedHeader, DarkModeToggle, useDarkMode } from '@inkwon/ui';
import { profile } from '@/data/profile';

const FAVICON_LIGHT = '/favicon-light.png';
const FAVICON_DARK = '/favicon-dark.png';

export default function Header() {
    const { dark } = useDarkMode();
    const socialLinks = [
        { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
        profile.github
            ? { href: profile.github, label: 'GitHub', icon: Github }
            : null,
        profile.linkedin
            ? { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin }
            : null,
        profile.blog
            ? { href: profile.blog, label: '블로그', icon: BookOpen }
            : null,
    ].filter((item): item is { href: string; label: string; icon: typeof Mail } => item !== null);

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
                logoDarkSrc={profile.headerLogoDarkUrl}
                logoAlt={`${profile.name} home logo`}
                maxWidth={660}
                rightSlot={
                    <>
                        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-background-secondary">
                            <Image
                                src={profile.avatarUrl}
                                alt={`${profile.name} profile`}
                                width={32}
                                height={32}
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
                    </>
                }
            />
        </motion.div>
    );
}
