import { projects } from '@/data/profile';

const heroCopy = {
    title: '권인입니다.',
    subtitle: '필요한 것을 만들기 위해 배우고, 직접 구현합니다.',
};

export default function HeroSection() {
    const visibleProjects = projects.filter((p) => p.visible !== false);

    return (
        <div className="mx-auto w-full max-w-[660px] px-6 pb-16 pt-14">
            <header className="mb-11">
                <h1 className="mb-2.5 text-[27px] font-semibold tracking-[-0.01em] text-foreground">
                    {heroCopy.title}
                </h1>
                <p className="max-w-[46ch] text-base leading-[1.6] text-foreground-muted">
                    {heroCopy.subtitle}
                </p>
            </header>

            <ul className="m-0 list-none p-0">
                {visibleProjects.map((project) => (
                    <li key={project.id} className="border-b border-border py-[26px]" />
                ))}
            </ul>
        </div>
    );
}
