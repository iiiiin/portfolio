import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Franklin, IBM_Plex_Sans_KR, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const nanumGothicCoding = Nanum_Gothic_Coding({
  variable: "--font-nanum-gothic-coding",
  subsets: ["latin"],
  weight: ["400", "700"],
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
