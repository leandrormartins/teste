// Busca direta de RSS de veículos brasileiros (sem passar pelo agregador
// Google News, que criptografa as URLs e impede a resolução server-side).
//
// Cada item já vem com link direto e media:thumbnail — sem precisar seguir
// redirect nem extrair og:image em segunda chamada.

const FONTES: Array<{ nome: string; url: string }> = [
  { nome: "G1 Pop & Arte", url: "https://g1.globo.com/rss/g1/pop-arte/" },
  { nome: "G1 Esportes", url: "https://g1.globo.com/rss/g1/esportes/" },
  { nome: "ge", url: "https://ge.globo.com/feed/" },
  { nome: "IstoÉ Gente", url: "https://istoe.com.br/feed/gente/" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

export type Noticia = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  image: string | null;
};

function stripCdata(raw: string): string {
  return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function decode(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function extractImage(itemXml: string): string | null {
  // media:thumbnail
  const thumb = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)?.[1];
  if (thumb) return thumb;
  // media:content type="image/..."
  const content = itemXml.match(
    /<media:content[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i,
  )?.[1];
  if (content) return content;
  // enclosure type="image/..."
  const enclosure = itemXml.match(
    /<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i,
  )?.[1];
  if (enclosure) return enclosure;
  // <img> dentro de description ou content:encoded
  const desc =
    itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1] ??
    itemXml.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1] ??
    "";
  const cleaned = stripCdata(desc);
  const imgSrc = cleaned.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  return imgSrc ?? null;
}

async function fetchFonte(fonte: { nome: string; url: string }): Promise<Noticia[]> {
  try {
    const res = await fetch(fonte.url, {
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[news] ${fonte.nome} retornou HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items
      .map((item) => {
        const titleRaw = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
        const linkRaw = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "";
        const pubRaw = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
        const title = decode(stripCdata(titleRaw));
        const link = decode(stripCdata(linkRaw));
        const pubDate = stripCdata(pubRaw);
        const image = extractImage(item);
        return {
          title,
          link,
          source: fonte.nome,
          pubDate,
          image,
        };
      })
      .filter((n) => n.title && n.link);
  } catch (err) {
    console.error(`[news] erro em ${fonte.nome}:`, err);
    return [];
  }
}

export async function fetchNoticias(limit = 12): Promise<Noticia[]> {
  const lotes = await Promise.all(FONTES.map((f) => fetchFonte(f)));
  const todas = lotes.flat();

  // Dedupe por link
  const visto = new Set<string>();
  const unicas = todas.filter((n) => {
    if (visto.has(n.link)) return false;
    visto.add(n.link);
    return true;
  });

  // Ordena por data desc
  unicas.sort((a, b) => {
    const ta = new Date(a.pubDate).getTime();
    const tb = new Date(b.pubDate).getTime();
    return (isNaN(tb) ? 0 : tb) - (isNaN(ta) ? 0 : ta);
  });

  return unicas.slice(0, limit);
}
