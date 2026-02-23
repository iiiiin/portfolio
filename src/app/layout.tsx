import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import RightNav from "@/components/navigation/RightNav";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

// 폰트 설정
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const siteUrl = getSiteUrl();

// SEO 메타데이터
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "권인 포트폴리오",
  description: "개발자 권인의 개인 포트폴리오 웹사이트입니다.",
  keywords: ["포트폴리오", "프론트엔드", "개발자", "커리어", "로드맵", "권인"],
  authors: [{ name: "권인" }],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "권인 포트폴리오",
    description: "대학 졸업부터 현재까지의 커리어 여정을 시각적으로 표현한 개인 포트폴리오 웹사이트입니다.",
    type: "website",
    siteName: "권인 포트폴리오",
    url: "/",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const storedTheme = localStorage.getItem('theme');
              if (storedTheme === 'light' || storedTheme === 'dark') {
                document.documentElement.dataset.theme = storedTheme;
              } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
              }
            } catch {}
          })();`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RightNav />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
