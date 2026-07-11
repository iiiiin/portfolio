import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteUrl } from "@/lib/site-url";
import { profile } from "@/data/profile";
import "./globals.css";

// 폰트 설정 (Pretendard 자체 호스팅 — 구글 폰트 네트워크 의존성 제거)
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});
const siteUrl = getSiteUrl();

// SEO 메타데이터 (title/description은 여기 한 곳에만 정의 — openGraph/twitter는 별도 지정 없으면 자동으로 이 값을 물려받음)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InKwon — Portfolio",
    template: "%s | inkwon",
  },
  description: "프론트엔드, 크로스 플랫폼 기반의 웹/앱 프로젝트 개발 경험을 소개하는 권인의 포트폴리오입니다.",
  keywords: ["포트폴리오", "프론트엔드", "개발자", "커리어", "로드맵", "권인"],
  authors: [{ name: "권인" }],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    siteName: "InKwon",
    locale: "ko_KR",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}${profile.avatarUrl}`,
  jobTitle: "Frontend Developer",
  sameAs: [profile.github, profile.linkedin, profile.blog].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light">
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
