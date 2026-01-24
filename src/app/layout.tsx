import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

// SEO 메타데이터
export const metadata: Metadata = {
  title: "권인 포트폴리오",
  description: "대학 졸업부터 현재까지의 커리어 여정을 시각적으로 표현한 개인 포트폴리오 웹사이트입니다.",
  keywords: ["포트폴리오", "프론트엔드", "개발자", "커리어", "로드맵", "권인"],
  authors: [{ name: "권인" }],
  icons: {
    icon: "/favicon_demo.png",
  },
  openGraph: {
    title: "권인 포트폴리오",
    description: "대학 졸업부터 현재까지의 커리어 여정을 시각적으로 표현한 개인 포트폴리오 웹사이트입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
