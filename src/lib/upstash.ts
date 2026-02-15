import "server-only";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

function hasUpstashConfig() {
  return Boolean(UPSTASH_URL && UPSTASH_TOKEN);
}

async function upstashRequest<T>(commandPath: string): Promise<T | null> {
  if (!hasUpstashConfig()) {
    return null;
  }

  const response = await fetch(`${UPSTASH_URL}${commandPath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as { result?: T };
  return json.result ?? null;
}

export async function getViews(slug: string): Promise<number> {
  const result = await upstashRequest<string | number>(`/get/blog:views:${slug}`);
  if (result === null) {
    return 0;
  }

  const value = typeof result === "number" ? result : Number(result);
  return Number.isFinite(value) ? value : 0;
}

export async function incrementViews(slug: string): Promise<number> {
  const result = await upstashRequest<string | number>(`/incr/blog:views:${slug}`);
  if (result === null) {
    return 0;
  }

  const value = typeof result === "number" ? result : Number(result);
  return Number.isFinite(value) ? value : 0;
}

