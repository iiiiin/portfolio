import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
}: BlogPostPageProps): Promise<Metadata> {
  return {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await params;
  notFound();
}
