import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Pretendard, Nanum Gothic Coding 모두 자체 호스팅 — 구글 폰트 네트워크 의존성 제거
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const nanumGothicCoding = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/nanum-gothic-coding/files/nanum-gothic-coding-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/nanum-gothic-coding/files/nanum-gothic-coding-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nanum-gothic-coding",
  display: "swap",
});

export const metadata: Metadata = {
  title: "일하며 남기는 개발 기록",
  description:
    "검색하다 흘러들어온 누군가에게도 쓸모 있길 바라며 정리하는, 배운 것들의 기록.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${libreFranklin.variable} ${ibmPlexSansKR.variable} ${nanumGothicCoding.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
