import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteUrl } from "@/lib/site-url";
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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "InKwon — Blog",
    template: "%s | inkwon",
  },
  description:
    "검색하다 흘러들어온 누군가에게도 쓸모 있길 바라며 정리하는, 배운 것들의 기록.",
  alternates: {
    canonical: "/",
  },
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
      className={`${pretendard.variable} ${nanumGothicCoding.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
