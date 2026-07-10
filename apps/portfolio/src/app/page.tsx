import type { Metadata } from "next";
import PortfolioClient from '@/components/PortfolioClient';
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "권인 포트폴리오",
  description:
    "권인의 포트폴리오입니다. 프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "권인 포트폴리오",
    description:
      "프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
    type: "website",
    url: siteUrl,
    siteName: "권인 포트폴리오",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "권인 포트폴리오",
    description:
      "프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개합니다.",
  },
};

/**
 * 메인 페이지 컴포넌트
 * - 히어로 섹션
 */
export default function Home() {
  return <PortfolioClient />;
}
