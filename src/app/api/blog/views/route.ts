import { NextRequest, NextResponse } from "next/server";
import { getViews, incrementViews } from "@/lib/upstash";

const VIEW_COOKIE_TTL = 60 * 60 * 24;

function isValidSlug(slug: string) {
  return /^[a-zA-Z0-9._-]+$/.test(slug);
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";

  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const views = await getViews(slug);
  return NextResponse.json({ views });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug ?? "";

  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const cookieKey = `blog_viewed_${slug}`;
  const alreadyCounted = request.cookies.get(cookieKey)?.value === "1";

  if (alreadyCounted) {
    const views = await getViews(slug);
    return NextResponse.json({ views, counted: false });
  }

  const views = await incrementViews(slug);
  const response = NextResponse.json({ views, counted: true });
  response.cookies.set(cookieKey, "1", {
    maxAge: VIEW_COOKIE_TTL,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}

