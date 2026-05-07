'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/components/PortfolioClient';
import { profile } from '@/data/profile';

const copy: Record<Locale, { body: string; cta: string }> = {
    ko: {
        body: '협업 기회를 기다리고 있습니다. 편하게 연락 주세요.',
        cta: '이메일 연락하기',
    },
    en: {
        body: 'I’m open to collaboration opportunities. Feel free to reach out.',
        cta: 'Contact by Email',
    },
    jp: {
        body: '協業の機会を歓迎しています。お気軽にご連絡ください。',
        cta: 'メールで連絡する',
    },
};

interface ContactSectionProps {
    locale: Locale;
}

export default function ContactSection({ locale }: ContactSectionProps) {
    const text = copy[locale];

    return (
        <section id="contact" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    className="card flex flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:px-8 md:text-left"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <p className="text-base text-foreground-secondary md:text-lg">
                        {text.body}
                    </p>
                    <motion.a
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {text.cta}
                        <ArrowUpRight className="h-4 w-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
