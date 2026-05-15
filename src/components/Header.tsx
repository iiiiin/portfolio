'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/components/PortfolioClient';
import { profile } from '@/data/profile';

interface HeaderProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export default function Header({ locale, setLocale }: HeaderProps) {
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
    );
}
