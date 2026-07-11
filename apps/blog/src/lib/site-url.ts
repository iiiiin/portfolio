export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (!envUrl) {
    return "http://localhost:3000";
  }

  return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
}
