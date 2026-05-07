import "server-only";

export interface WordPressPost {
  id: number;
  link: string;
  title: string;
  excerpt: string;
  date: string;
}

interface WordPressApiPost {
  id: number;
  link: string;
  date: string;
  title?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
}

const POSTS_API_URL =
  "https://blog.inkwon.me/wp-json/wp/v2/posts?per_page=3&_fields=id,link,date,title,excerpt";

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function getLatestWordPressPosts(): Promise<WordPressPost[]> {
  try {
    const response = await fetch(POSTS_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const posts = (await response.json()) as WordPressApiPost[];

    return posts.map((post) => ({
      id: post.id,
      link: post.link,
      title: stripHtml(post.title?.rendered ?? ""),
      excerpt: stripHtml(post.excerpt?.rendered ?? ""),
      date: post.date,
    }));
  } catch {
    return [];
  }
}
