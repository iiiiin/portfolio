import type { Locale } from '@/types/locale';

export interface ProfileData {
    name: string;
    avatarUrl: string;
    headerLogoUrl: string;
    email: string;
    github?: string;
    linkedin?: string;
    blog?: string;
}

export interface Project {
    id: string;
    visible?: boolean;
    displayType?: 'web' | 'chrome-ext' | 'app';
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    image?: string;
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
        displayType: 'app',
        title: {
            ko: 'PAWPRINT',
            en: 'PAWPRINT',
            jp: 'PAWPRINT',
        },
        description: {
            ko: '반려동물 건강 분석/활동량 관리 서비스',
            en: 'Pet health analysis & activity management service',
            jp: 'ペット健康分析・活動量管理サービス',
        },
        image: '/pawprint_noframe.png',
        tags: ['Flutter', 'Riverpod', 'Firebase', 'Sentry', 'Docker'],
        links: {
            github: '',
        },
    },
    {
        id: 'cocos-forest',
        visible: true,
        displayType: 'app',
        title: {
            ko: '코코의 숲',
            en: "Coco's Forest",
            jp: 'ココの森',
        },
        description: {
            ko: '소비내역 기반 탄소배출량 추적 앱',
            en: 'Carbon footprint tracker based on spending history',
            jp: '消費履歴をもとにした炭素排出量追跡アプリ',
        },
        image: '/cocosforest_noframe_cut.png',
        tags: ['React Native', 'Expo', 'Zustand', 'Axios', 'TanStack Query', 'OCR'],
        links: {
            github: 'https://github.com/iiiiin/cocos-forest.git',
        },
    },
    {
        id: 'turtleneck-reminder',
        visible: true,
        displayType: 'chrome-ext',
        title: {
            ko: '거북목 알리미',
            en: 'Turtleneck Reminder',
            jp: 'ストレートネックアラーム',
        },
        description: {
            ko: '실사용자 35명의 자세 교정을 돕는 크롬 확장프로그램',
            en: 'Chrome extension helping 35 real users fix their posture',
            jp: '実ユーザー35名の姿勢改善を支援するChrome拡張機能',
        },
        image: '/neckno.png',
        tags: ['Chrome Extension', 'Manifest V3', 'Alarms API', 'Notifications API', 'i18n'],
        links: {
            store: 'https://chromewebstore.google.com/detail/dnojahjhfhgblnfggidnhjnjmfeeenmi?utm_source=item-share-cb',
            github: 'https://github.com/iiiiin/turtleneck-reminder.git',
        },
    },
    {
        id: 'review',
        visible: false,
        displayType: 'web',
        title: {
            ko: 'RE:VIEW',
            en: 'RE:VIEW',
            jp: 'RE:VIEW',
        },
        description: {
            ko: 'AI 면접 코칭 피드백 웹 서비스',
            en: 'AI-powered interview coaching feedback web service',
            jp: 'AI面接コーチングフィードバックWebサービス',
        },
        image: '/review.png',
        tags: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        links: {
            github: 'https://github.com/iiiiin/review.git',
        },
    },
    {
        id: 'lunch-hourglass',
        visible: false,
        displayType: 'chrome-ext',
        title: {
            ko: '배꼽시계',
            en: 'Lunch Hourglass',
            jp: 'ランチ砂時計',
        },
        description: {
            ko: '출근부터 점심까지 시간을 픽셀 버거 레이어로 시각화하는 크롬 확장프로그램',
            en: 'Chrome extension visualizing time to lunch as pixel burger layers',
            jp: '出勤から昼食までの時間をピクセルバーガーで可視化するChrome拡張機能',
        },
        image: '/burger.png',
        tags: ['Chrome Extension', 'Manifest V3', 'Content Script', 'Storage API', 'i18n'],
        links: {
            store: 'https://chromewebstore.google.com/detail/cickockdphahndbedfjbjalmkoepijag?utm_source=item-share-cb',
            github: 'https://github.com/iiiiin/lunch-hourglass.git',
        },
    },
];
