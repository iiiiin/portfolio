// 네비게이션 섹션 데이터
import { User, FolderKanban, Mail } from 'lucide-react';
import { ComponentType } from 'react';

export interface NavSection {
    id: string;
    title: string;
    icon: ComponentType<{ className?: string }>;
}

// 네비게이션 섹션 목록
export const navSections: NavSection[] = [
    {
        id: 'profile',
        title: 'Profile',
        icon: User,
    },
    {
        id: 'project',
        title: 'Project',
        icon: FolderKanban,
    },
    {
        id: 'contact',
        title: 'Contact',
        icon: Mail,
    },
];
