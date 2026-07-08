// 실행 방법: npx tsx scripts/test-notion.ts
// (tsx가 없다면: npm install -D tsx)

import { config } from "dotenv";
config({ path: ".env.local" });
import { getPublishedPosts } from "../src/lib/notion";

async function main() {
  console.log("Notion에서 Published 글 가져오는 중...\n");

  try {
    const posts = await getPublishedPosts();

    if (posts.length === 0) {
      console.log("⚠️  Published 상태인 글이 없습니다.");
      console.log("   Notion에서 테스트 글의 Status를 'Published'로 바꿔보세요.");
      return;
    }

    console.log(`✅ ${posts.length}개의 글을 가져왔습니다.\n`);
    posts.forEach((post) => {
      console.log(`- [${post.slug}] ${post.title}`);
      console.log(`  요약: ${post.summary || "(없음)"}`);
      console.log(`  태그: ${post.tags.join(", ") || "(없음)"}`);
      console.log(`  발행일: ${post.publishedAt || "(없음)"}`);
      console.log();
    });
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    console.log("\n체크리스트:");
    console.log("1. .env.local에 NOTION_API_KEY, NOTION_DATABASE_ID가 정확히 들어있는지");
    console.log("2. Notion Blog 페이지에서 '연결(Connections)'에 이 integration을 추가했는지");
    console.log("3. 데이터베이스 ID에 하이픈(-)이나 불필요한 문자가 섞이지 않았는지");
  }
}

main();