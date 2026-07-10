# Portfolio

개인 포트폴리오 사이트입니다. 현재는 블로그 기능을 분리하고, 단일 랜딩 형태의 포트폴리오에 맞춰 정리되어 있습니다.

## Overview

- 라이트 모드 기반의 미니멀 포트폴리오
- 히어로 섹션, 프로젝트 캐러셀, 블로그 링크 자리, 이메일 CTA 구성
- `src/data/profile.ts` 중심의 데이터 관리
- Next.js App Router + Tailwind CSS + Framer Motion 사용

## Stack

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React

## Structure

```text
src/
  app/
    layout.tsx
    page.tsx
  components/
    HeroSection.tsx
    sections/
      ProjectSection.tsx
      ContactSection.tsx
  data/
    profile.ts
public/
  personal.png
```

## Key Files

- `src/components/HeroSection.tsx`
  헤더, 프로필 이미지, 소개 문구, 소셜 링크를 렌더링합니다.
- `src/components/sections/ProjectSection.tsx`
  프로젝트 캐러셀과 우측 블로그 링크 플레이스홀더를 렌더링합니다.
- `src/components/sections/ContactSection.tsx`
  하단 이메일 CTA를 렌더링합니다.
- `src/data/profile.ts`
  프로필 이미지, 헤더 로고, 소셜 링크, 프로젝트 데이터를 관리합니다.

## Assets

- 히어로 프로필 이미지: `public/personal.png`
- 헤더 로고: `public/favicon_rev.png`
- favicon: `src/app/icon.png`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```
