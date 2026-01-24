'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, BookOpen, Send } from 'lucide-react';
import { profile } from '@/data/profile';

/**
 * Contact 섹션 컴포넌트
 * - 연락처 정보 및 CTA
 */
export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4">
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
                        <span className="gradient-text">Contact</span>
                    </h2>
                    <p className="text-foreground-secondary">
                        {profile.contact.header}
                    </p>
                </motion.div>

                {/* 연락처 카드 */}
                <motion.div
                    className="card section-card p-8 md:p-12 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* 이메일 */}
                    <div className="mb-8">
                        <p className="text-foreground-muted mb-2">이메일</p>
                        <a
                            href={`mailto:${profile.email}`}
                            className="text-2xl md:text-3xl font-bold text-accent-primary hover:underline"
                        >
                            {profile.email}
                        </a>
                    </div>

                    {/* 소셜 링크 (블로그 추가) */}
                    <div className="flex justify-center gap-4 mb-8">
                        {profile.github && (
                            <motion.a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-background-secondary flex items-center justify-center text-foreground-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                title="GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </motion.a>
                        )}
                        {profile.linkedin && (
                            <motion.a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-background-secondary flex items-center justify-center text-foreground-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                title="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6" />
                            </motion.a>
                        )}
                        {profile.blog && (
                            <motion.a
                                href={profile.blog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-background-secondary flex items-center justify-center text-foreground-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                title="Blog"
                            >
                                <BookOpen className="w-6 h-6" />
                            </motion.a>
                        )}
                        <motion.a
                            href={`mailto:${profile.email}`}
                            className="w-14 h-14 rounded-full bg-background-secondary flex items-center justify-center text-foreground-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            title="Email"
                        >
                            <Mail className="w-6 h-6" />
                        </motion.a>
                    </div>

                    {/* CTA 버튼 */}
                    <motion.a
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full
              bg-gradient-to-r from-accent-primary to-accent-secondary
              text-white font-medium text-lg
              hover:shadow-lg hover:shadow-accent-primary/30
              transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send className="w-5 h-5" />
                        {profile.contact.ctaLabel}
                    </motion.a>

                    {/* 추가 메시지 */}
                    <p className="mt-8 text-sm text-foreground-muted">
                        {profile.contact.footerMessage}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
