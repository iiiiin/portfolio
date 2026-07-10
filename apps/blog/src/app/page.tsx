import { getPublishedPosts } from "@/lib/notion";
import TilList, { type TilListPost } from "@/components/TilList";

// 60초마다 백그라운드에서 재검증 (Notion에서 새 글 발행하면 최대 1분 내 반영)
export const revalidate = 60;

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function HomePage() {
  const posts = await getPublishedPosts();

  const tilPosts: TilListPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    dateStr: formatDate(post.publishedAt),
    tags: post.tags,
  }));

  return <TilList posts={tilPosts} />;
}