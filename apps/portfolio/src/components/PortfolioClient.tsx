import { Footer } from '@inkwon/ui';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { profile } from '@/data/profile';

export default function PortfolioClient() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <HeroSection />
            <Footer name="In Kwon" maxWidth={660} />
        </div>
    );
}
