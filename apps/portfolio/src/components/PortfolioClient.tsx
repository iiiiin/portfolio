'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

export default function PortfolioClient() {
    return (
        <main className="h-dvh overflow-hidden bg-background">
            <section className="h-full px-4">
                <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                    <Header />
                    <HeroSection />
                </div>
            </section>
        </main>
    );
}
