import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Client를 즉시 생성하지 않고, 처음 쓰일 때 생성 (환경변수 로딩 타이밍 문제 방지)
let _notion: Client | null = null;
export function getNotionClient(): Client {
  if (!_notion) {
    _notion = new Client({ auth: process.env.NOTION_API_KEY });
  }
  return _notion;
}

let _n2m: NotionToMarkdown | null = null;
export function getN2M(): NotionToMarkdown {
  if (!_n2m) {
    _n2m = new NotionToMarkdown({ notionClient: getNotionClient() });
  }
  return _n2m;
}

function getDataSourceId(): string {
  return process.env.NOTION_DATA_SOURCE_ID!;
}

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  publishedAt: string;
  coverImage: string | null;
}

// Status가 "Published"인 글만 가져오기
export async function getPublishedPosts(): Promise<PostMeta[]> {
  const response = await getNotionClient().dataSources.query({
    data_source_id: getDataSourceId(),
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "PublishedAt", direction: "descending" }],
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props.Name?.title?.[0]?.plain_text ?? "제목 없음",
      slug: props.Slug?.rich_text?.[0]?.plain_text ?? "",
      summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
      tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      publishedAt: props.PublishedAt?.date?.start ?? "",
      coverImage: props.CoverImage?.files?.[0]?.file?.url
        ?? props.CoverImage?.files?.[0]?.external?.url
        ?? null,
    };
  });
}

// slug로 특정 글 하나 찾기 (상세 페이지용)
export async function getPostBySlug(slug: string) {
  const response = await getNotionClient().dataSources.query({
    data_source_id: getDataSourceId(),
    filter: {
      and: [
        { property: "Status", select: { equals: "Published" } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
  });

  const page = response.results[0];
  if (!page) return null;

  // 본문을 마크다운으로 변환
  const mdBlocks = await getN2M().pageToMarkdown(page.id);
  const mdString = getN2M().toMarkdownString(mdBlocks);

  const props = (page as any).properties;
  return {
    title: props.Name?.title?.[0]?.plain_text ?? "제목 없음",
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? "",
    summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
    tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
    publishedAt: props.PublishedAt?.date?.start ?? "",
    content: mdString.parent, // 마크다운 본문 문자열
  };
}