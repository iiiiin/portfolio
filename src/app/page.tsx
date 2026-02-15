'use client';

import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ProjectSection from '@/components/sections/ProjectSection';

/**
 * 메인 페이지 컴포넌트
 * - 히어로 섹션
 * - Profile 섹션
 * - Project 섹션
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* Profile 섹션 */}
      <ProfileSection />

      {/* Project 섹션 */}
      <ProjectSection />

      {/* 푸터 */}
      <footer className="py-8 text-center border-t border-gray-200">
        <p className="text-sm text-foreground-muted">
          © 2026. Kwon In. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
