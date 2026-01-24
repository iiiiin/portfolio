// 프로필 및 프로젝트 데이터
// 실제 정보로 교체해주세요

export interface ProfileData {
    name: string;
    title: string;
    tagline: string;
    avatarUrl: string;
    bio: string;
    email: string;
    github?: string;
    linkedin?: string;
    blog?: string;
    skills: SkillCategory[];
    hero: {
        titleName: string;
        titleSuffix: string;
        subtitle: string;
        // description: string;
        ctaLabel: string;
    };
    timeline: {
        date: string;
        text: string;
    }[];
    skillLogos: {
        name: string;
        src: string;
    }[];
    contact: {
        header: string;
        ctaLabel: string;
        footerMessage: string;
    };
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    tags: string[];
    highlights?: {
        label: string;
        text: string;
    }[];
    links?: {
        demo?: string;
        github?: string;
    };
}

// 프로필 데이터
export const profile: ProfileData = {
    name: '권인',
    title: 'Frontend Developer',
    tagline: '사용자 경험을 중시하는 프론트엔드 개발자',
    avatarUrl: '/personal.png',
    bio: '안녕하세요! 저는 프론트엔드 개발자입니다. \n Flutter와 React를 주로 사용하며, \n 사용자 중심의 인터페이스를 만드는 것을 좋아합니다. \n 새로운 기술을 배우고 적용하는 것을 즐기며, \n 팀과 함께 성장하는 것을 중요하게 생각합니다.',
    email: 'in24041210@gmail.com',
    github: 'https://github.com/iiiiin',
    blog: 'https://velog.io/@iiiiin',
    skills: [
        {
            category: 'Frontend',
            items: ['Flutter', 'React', 'Next.js', 'TypeScript'],
        },
        {
            category: 'Backend',
            items: ['Node.js', 'Firebase', 'Supabase'],
        },
        {
            category: 'Tools',
            items: ['Git', 'Figma', 'Sentry', 'Docker'],
        },
    ],
    hero: {
        titleName: '권인',
        titleSuffix: '포트폴리오',
        subtitle: '사용자 경험을 중시하는 프론트엔드 개발자',
        // description: '대학 졸업부터 현재까지, 저의 성장 과정을 스크롤하며 함께 여행해보세요.',
        ctaLabel: '시작하기',
    },
    timeline: [
        { date: '2023.02', text: '단국대학교 기계공학과 졸업' },
        { date: '2023.07', text: 'KEPCO Digital BootCamp 1기 수료' },
        { date: '2025.10', text: '삼성 청년 SW 아카데미 13기' },
        { date: '2025.11', text: '(주)도터펫 프론트엔드 계약직 (3개월)' },
        { date: '현재', text: '프론트엔드 개발자로 활동 중' },
    ],
    skillLogos: [
        { name: 'Flutter', src: '/flutter.png' },
        { name: 'React', src: '/react.png' },
        { name: 'HTML', src: '/html.png' },
        { name: 'CSS', src: '/css.png' },
        { name: 'TailWindCSS', src: '/tailwind.svg' },
        { name: 'TypeScript', src: '/typescript.svg' },
        { name: 'JavaScript', src: '/javascript.png' },
        { name: 'Zustand', src: '/zustand.svg' },
        { name: 'React Query', src: '/tanstackQuery.png' },
        { name: 'Python', src: '/python.png' },
        { name: 'Django', src: '/django.png' },
        { name: 'Sentry', src: '/sentry.png' },
        { name: 'Firebase', src: '/firebase1.png' },
        { name: 'GitHub Actions', src: '/ghactions.png' },
        { name: 'Notion', src: '/notion.png' },
        { name: 'Slack', src: '/slack1.png' },
        ],
    contact: {
        header: '연락처 입니다.',
        ctaLabel: '이메일 보내기',
        footerMessage: '모든 문의 환영합니다!',
    },
};

// 프로젝트 데이터
export const projects: Project[] = [
    {
        id: 'pawprint',
        title: 'PAWPRINT',
        description: '반려동물 건강 분석/활동량 관리 서비스',
        image: '/pawprint_1_bg.png',
        tags: ['Flutter', 'Riverpod', 'Firebase', 'Sentry', 'AWS', 'Docker'],
        highlights: [
            { label: 'My Role', text: 'Flutter Web/App 개발, 관리자 페이지 구축, 인증 구조 개선' },
            { label: 'Key Features', text: 'JWT 인증 분리(앱/웹), 토큰 핸들링 최적화' },
            { label: 'Impact', text: '보안 강화 및 토큰 탈취 리스크 감소' },
        ],
        links: {
            demo: '',
            github: '',
        },
    },
    {
        id: 'review',
        title: 'RE:VIEW',
        description: 'AI 면접 피드백을 제공하는 웹 서비스',
        image: '/review.png',
        tags: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        highlights: [
            { label: 'My Role', text: 'React 기반 UI/UX 개발, 인증/토큰 처리' },
            { label: 'Key Features', text: '디바운스 입력 검증, 토큰 재발급 리트라이' },
            { label: 'Impact', text: '렌더링 비용 감소 및 API 호출 감소' },
        ],
        links: {
            demo: '',
            github: '',
        },
    },
    {
        id: 'cocos-forest',
        title: '코코의 숲',
        description: '소비내역 기반 탄소배출량 관리 습관 형성 앱',
        image: '/cocosforest_1.png',
        tags: ['React Native', 'Expo', 'Zustand', 'Axios', 'React Query', 'OCR'],
        highlights: [
            { label: 'My Role', text: 'React Native UI/UX 개발, OCR 연동' },
            { label: 'Key Features', text: 'React Query Prefetch, 이미지 전처리' },
            { label: 'Impact', text: '로딩 시간 단축 및 네트워크 요청 감소' },
        ],
        links: {
            demo: '',
            github: '',
        },
    },
];
