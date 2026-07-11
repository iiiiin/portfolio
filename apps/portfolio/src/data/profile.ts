export interface ProfileData {
    name: string;
    avatarUrl: string;
    headerLogoUrl: string;
    headerLogoDarkUrl: string;
    email: string;
    github?: string;
    linkedin?: string;
    blog?: string;
}

export interface Project {
    id: string;
    visible?: boolean;
    title: string;
    description: string;
    period?: string;
    role?: string;
    highlights?: string[];
    tags: string[];
    links?: {
        store?: string;
        github?: string;
    };
}

// 프로필 데이터
export const profile: ProfileData = {
    name: '권인',
    avatarUrl: '/personal.png',
    headerLogoUrl: '/favicon_rev.png',
    headerLogoDarkUrl: '/favicon_rev_dark.png',
    email: 'in24041210@gmail.com',
    github: 'https://github.com/iiiiin',
    linkedin: 'https://www.linkedin.com/in/in-kwon-16258b203/',
    blog: 'https://blog.inkwon.me/',
};

// 프로젝트 데이터
export const projects: Project[] = [
    {
        id: 'pawprint',
        visible: true,
        title: 'PAWPRINT',
        description: '반려동물 건강 분석/활동량 관리 서비스',
        period: '2025.11 ~ 2026.01',
        role: 'Flutter Web/App 페이지 API 연동, 사용자 테스트 운영',
        highlights: [
            'Web · App 플랫폼별 JWT 인증 전략 분리 구현 (HttpOnly Cookie · Secure Storage)',
            'Sentry + Slack 웹훅으로 크리티컬 이슈 실시간 알림 파이프라인 구성',
        ],
        tags: ['Flutter', 'Riverpod', 'Firebase', 'Sentry', 'GitHub Actions'],
        links: {
            github: '',
        },
    },
    {
        id: 'cocos-forest',
        visible: true,
        title: '코코의 숲',
        description: '소비내역 기반 탄소배출량 추적 앱',
        period: '2025.09 ~ 2025.10',
        role: '대시보드 API 연동, OCR 전처리 로직 구현, Expo 빌드',
        highlights: [
            'prefetchQuery로 인접 월 데이터 선제 캐싱, 월 전환 시 로딩 없는 대시보드 UX 구현',
            '이미지 압축 · FormData 표준화로 영수증 업로드 413 오류 및 Nginx 차단 해소',
        ],
        tags: ['React Native', 'Expo', 'Zustand', 'Axios', 'TanStack Query'],
        links: {
            github: 'https://github.com/iiiiin/cocos-forest.git',
        },
    },
    {
        id: 'turtleneck-reminder',
        visible: true,
        title: '거북목 알리미',
        description: '사용자의 주기적인 자세 교정을 돕는 크롬 확장프로그램',
        period: '2026.01 ~',
        role: 'Chrome 확장 프로그램 기획·설계·단독 개발 및 스토어 배포',
        highlights: [
            '기획부터 Manifest V3 Service Worker 구조 설계·구현까지 단독 개발',
            '한·영·일 i18n 지원 및 Chrome Web Store 배포 자동화',
        ],
        tags: ['Chrome Extension', 'Manifest V3', 'Alarms API', 'Notifications API', 'i18n'],
        links: {
            store: 'https://chromewebstore.google.com/detail/dnojahjhfhgblnfggidnhjnjmfeeenmi?utm_source=item-share-cb',
            github: 'https://github.com/iiiiin/turtleneck-reminder.git',
        },
    },
    {
        id: 'review',
        visible: false,
        title: 'RE:VIEW',
        description: 'AI 면접 코칭 피드백 웹 서비스',
        tags: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        links: {
            github: 'https://github.com/iiiiin/review.git',
        },
    },
    {
        id: 'lunch-hourglass',
        visible: false,
        title: '배꼽시계',
        description: '출근부터 점심까지 시간을 픽셀 버거 레이어로 시각화하는 크롬 확장프로그램',
        tags: ['Chrome Extension', 'Manifest V3', 'Content Script', 'Storage API', 'i18n'],
        links: {
            store: 'https://chromewebstore.google.com/detail/cickockdphahndbedfjbjalmkoepijag?utm_source=item-share-cb',
            github: 'https://github.com/iiiiin/lunch-hourglass.git',
        },
    },
];
