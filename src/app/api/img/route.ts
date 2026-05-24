// Proxy server-side de imagens: GET /api/img?url=<encoded>
// Busca a imagem na origem com UA de browser e re-serve com cache de 24h.
// Cache da Vercel (CDN edge) faz com que cada URL bata na origem só 1× por dia.

import { NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

const TIMEOUT_MS = 8000;
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = /^image\//;

function isSafeUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host.endsWith(".internal") ||
      host.endsWith(".local")
    ) {
      return false;
    }
    // Bloqueia ranges privados IPv4
    if (
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[01])\./.test(host) ||
      /^169\.254\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !isSafeUrl(url)) {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": UA,
        Accept: "image/*,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);

    if (!upstream.ok) {
      return new NextResponse(`Upstream ${upstream.status}`, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    if (!ALLOWED_TYPES.test(contentType)) {
      return new NextResponse("Not an image", { status: 415 });
    }

    const buf = await upstream.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) {
      return new NextResponse("Image too large", { status: 413 });
    }

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // 24h no browser, 24h no edge da Vercel
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch (err: unknown) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[api/img] erro:", msg);
    return new NextResponse("Fetch failed", { status: 502 });
  }
}
