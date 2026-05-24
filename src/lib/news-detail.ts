// Resolve uma URL do Google News para a matéria original e extrai
// metadados Open Graph (título, descrição, imagem) que o veículo publica
// para compartilhamento. Não baixa nem reproduz o corpo da matéria.

export type NoticiaDetalhe = {
  title: string;
  description: string;
  image: string | null;
  sourceUrl: string;
  sourceHost: string;
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

function metaContent(html: string, key: string): string | null {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const r1 = new RegExp(
    `<meta[^>]+(?:property|name)=["']${esc}["'][^>]*\\bcontent=["']([^"']+)["']`,
    "i",
  );
  const r2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${esc}["']`,
    "i",
  );
  return html.match(r1)?.[1] ?? html.match(r2)?.[1] ?? null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function safeHost(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Imagens "lixo" típicas (logo Google News, gstatic, etc.) — não devem
// virar thumb da matéria.
function isJunkImage(url: string): boolean {
  if (!url) return true;
  const host = safeHost(url);
  if (!host) return true;
  return (
    host === "news.google.com" ||
    host.endsWith(".gstatic.com") ||
    host === "gstatic.com" ||
    host === "ssl.gstatic.com" ||
    host === "lh3.googleusercontent.com" // logo padrão do Google News
  );
}

// Tenta decodificar a URL embutida no token base64 do Google News.
// Funciona para o formato antigo; URLs novas (criptografadas) retornam null.
function tryDecodeGoogleNewsUrl(url: string): string | null {
  const m = url.match(/news\.google\.com\/(?:rss\/)?articles\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  try {
    let b64 = m[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const buf = Buffer.from(b64, "base64");
    const text = buf.toString("utf8");
    const urlMatch = text.match(/https?:\/\/[^\s\x00-\x1f"<>]{8,}/);
    if (!urlMatch) return null;
    const candidate = urlMatch[0];
    if (candidate.includes("news.google.com")) return null;
    return candidate;
  } catch {
    return null;
  }
}

async function buscarSourceUrl(googleNewsUrl: string): Promise<{
  finalUrl: string;
  html: string;
} | null> {
  // 1) tenta decodificar URL antiga direto
  const decoded = tryDecodeGoogleNewsUrl(googleNewsUrl);
  if (decoded) {
    const res = await fetch(decoded, {
      redirect: "follow",
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return { finalUrl: res.url, html: await res.text() };
    }
  }

  // 2) fetcha a URL do Google News com UA de browser real e segue redirect
  const first = await fetch(googleNewsUrl, {
    redirect: "follow",
    headers: { "User-Agent": UA },
    next: { revalidate: 3600 },
  });
  if (!first.ok) return null;
  const firstUrl = first.url;
  const firstHtml = await first.text();

  // 3) se já fugiu do news.google.com, ótimo
  if (!firstUrl.includes("news.google.com")) {
    return { finalUrl: firstUrl, html: firstHtml };
  }

  // 4) ainda no Google News — tenta extrair o link real do HTML interstitial
  const linkMatch =
    firstHtml.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["'](https?:[^"']+)["']/i,
    ) ??
    firstHtml.match(
      /<a[^>]+jsname=["']tljFtd["'][^>]+href=["'](https?:[^"']+)["']/,
    ) ??
    firstHtml.match(/data-n-au=["'](https?:[^"']+)["']/) ??
    firstHtml.match(
      /<meta[^>]+http-equiv=["']refresh["'][^>]+url=(https?:[^"'>\s]+)/i,
    );

  if (linkMatch?.[1] && !linkMatch[1].includes("news.google.com")) {
    const second = await fetch(linkMatch[1], {
      redirect: "follow",
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (second.ok) {
      return { finalUrl: second.url, html: await second.text() };
    }
  }

  // 5) deu ruim — não conseguimos sair do Google News
  return null;
}

export async function fetchNoticiaDetalhe(
  googleNewsUrl: string,
): Promise<NoticiaDetalhe | null> {
  try {
    const resolved = await buscarSourceUrl(googleNewsUrl);
    if (!resolved) return null;

    // Se ainda assim caímos no Google News, abortamos
    if (resolved.finalUrl.includes("news.google.com")) return null;

    const { finalUrl, html } = resolved;

    const ogTitle =
      metaContent(html, "og:title") ?? metaContent(html, "twitter:title");
    const ogDesc =
      metaContent(html, "og:description") ??
      metaContent(html, "twitter:description") ??
      metaContent(html, "description");
    const ogImage =
      metaContent(html, "og:image") ?? metaContent(html, "twitter:image");

    const title = ogTitle ? decodeEntities(ogTitle).trim() : "";
    const description = ogDesc ? decodeEntities(ogDesc).trim() : "";
    let image = ogImage ? decodeEntities(ogImage).trim() : null;

    if (image && isJunkImage(image)) image = null;

    const sourceHost = safeHost(finalUrl);
    if (!title) return null;

    return {
      title,
      description,
      image,
      sourceUrl: finalUrl,
      sourceHost,
    };
  } catch (err) {
    console.error("[news-detail] erro:", err);
    return null;
  }
}
