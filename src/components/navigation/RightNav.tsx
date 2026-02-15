'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Menu, Moon, Sun, X } from 'lucide-react';

const tabs = [
    { href: '/', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
];

export default function RightNav() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleTheme = () => {
        const root = document.documentElement;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        const currentTheme = root.dataset.theme ?? systemTheme;
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        root.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <motion.header
            className="fixed inset-x-0 top-0 z-50"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            <div className="mx-auto mt-4 flex w-[min(960px,calc(100%-2rem))] items-center justify-between rounded-2xl border border-border bg-background-card/90 px-3 py-2 shadow-xl backdrop-blur-lg">
                <Link
                    href="/"
                    aria-label="Portfolio Home"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
                >
                    <Home className="h-4 w-4" />
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {tabs.map((tab) => {
                        const isActive =
                            tab.href === '/'
                                ? pathname === '/'
                                : pathname === '/blog' || pathname.startsWith('/blog/');

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-accent-primary text-white'
                                        : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="theme-toggle flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
                        aria-label="테마 전환"
                    >
                        <Sun className="theme-icon-sun h-4 w-4" />
                        <Moon className="theme-icon-moon h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-secondary transition-colors hover:border-accent-primary hover:text-accent-primary md:hidden"
                        aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen ? (
                    <motion.nav
                        className="mx-auto mt-2 w-[min(960px,calc(100%-2rem))] rounded-2xl border border-border bg-background-card/95 p-2 shadow-xl backdrop-blur-lg md:hidden"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tabs.map((tab) => {
                            const isActive =
                                tab.href === '/'
                                    ? pathname === '/'
                                    : pathname === '/blog' || pathname.startsWith('/blog/');

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-accent-primary text-white'
                                        : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                                        }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </motion.nav>
                ) : null}
            </AnimatePresence>
        </motion.header>
    );
}
