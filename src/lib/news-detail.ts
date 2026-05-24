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
  "Mozilla/5.0 (compatible; FamaIABot/1.0; +https://github.com/leandrormartins/teste)";

function metaContent(html: string, key: string): string | null {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // <meta property="og:image" content="...">
  const r1 = new RegExp(
    `<meta[^>]+(?:property|name)=["']${esc}["'][^>]*\\bcontent=["']([^"']+)["']`,
    "i",
  );
  // <meta content="..." property="og:image">
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

export async function fetchNoticiaDetalhe(
  googleNewsUrl: string,
): Promise<NoticiaDetalhe | null> {
  try {
    // 1. Segue redirect do Google News pra fonte
    const first = await fetch(googleNewsUrl, {
      redirect: "follow",
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (!first.ok) return null;

    let finalUrl = first.url;
    let html = await first.text();

    // 2. Se ainda estamos no domínio do Google News, tenta extrair o link
    //    real do HTML interstitial (Google News às vezes serve uma página
    //    intermediária com o link como atributo).
    if (finalUrl.includes("news.google.com")) {
      const linkMatch =
        html.match(/data-n-au=["']([^"']+)["']/) ??
        html.match(/<a[^>]+jsname=["']tljFtd["'][^>]+href=["']([^"']+)["']/) ??
        html.match(/<meta[^>]+http-equiv=["']refresh["'][^>]+url=([^"'>\s]+)/i);
      if (linkMatch?.[1]) {
        const second = await fetch(linkMatch[1], {
          redirect: "follow",
          headers: { "User-Agent": UA },
          next: { revalidate: 3600 },
        });
        if (second.ok) {
          finalUrl = second.url;
          html = await second.text();
        }
      }
    }

    // 3. Extrai metadados Open Graph (e fallbacks)
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
    const image = ogImage ? decodeEntities(ogImage).trim() : null;
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
