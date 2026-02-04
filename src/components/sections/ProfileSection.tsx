'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { profile } from '@/data/profile';

/**
 * Profile 섹션 컴포넌트
 * - 자기소개 및 스킬
 */
export default function ProfileSection() {
    return (
        <section id="profile" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* 섹션 헤더 */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Profile</span>
                    </h2>
                    <p className="text-foreground-secondary">
                        약력 및 기술 역량입니다.
                    </p>
                </motion.div>

                {/* 프로필 카드 */}
                <motion.div
                    className="card section-card p-8 md:p-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* 왼쪽: 아바타 및 자기소개 */}
                        <div className="flex flex-col items-center md:items-start md:w-1/3">
                            {/* 아바타 */}
                            <motion.div
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary to-accent-tertiary p-1 mb-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-full h-full rounded-full bg-background-card flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={profile.avatarUrl}
                                        alt={`${profile.name} avatar`}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* 이름 및 타이틀 */}
                            <h3 className="text-2xl font-bold text-foreground mb-1">
                                {profile.name}
                            </h3>
                            <p className="text-accent-primary font-semibold mb-4">
                                {profile.title}
                            </p>

                            {/* 자기소개 (아이콘 링크 자리에 배치) */}
                            <p className="text-base text-foreground-secondary leading-relaxed text-center md:text-left whitespace-pre-line">
                                {profile.bio}
                            </p>
                        </div>

                        {/* 오른쪽: 약력 및 스킬 */}
                        <div className="md:w-2/3">
                            {/* 약력 */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-foreground mb-3">
                                    약력
                                </h4>
                                <div className="space-y-3 text-foreground-secondary text-base">
                                    {profile.timeline.map((item) => (
                                        <div key={`${item.date}-${item.text}`} className="flex items-start gap-3">
                                            <span className="text-accent-primary font-semibold min-w-[80px]">
                                                {item.date}
                                            </span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 기술 스택 (이미지 로고) */}
                            <div>
                                <h4 className="text-lg font-semibold text-foreground mb-4">
                                    기술 스택
                                </h4>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                                    {profile.skillLogos.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            className="flex flex-col items-center gap-1"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <div className="skill-logo flex items-center justify-center">
                                                <Image
                                                    src={skill.src}
                                                    alt={skill.name}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="text-sm text-foreground-muted text-center">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
