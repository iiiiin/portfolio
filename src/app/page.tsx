import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ProjectSection from '@/components/sections/ProjectSection';
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "권인 포트폴리오 | Frontend Developer",
  description:
    "권인의 포트폴리오입니다. 프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "권인 포트폴리오 | Frontend Developer",
    description:
      "프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
    type: "website",
    url: siteUrl,
    siteName: "권인 포트폴리오",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "권인 포트폴리오 | Frontend Developer",
    description:
      "프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
  },
};

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
