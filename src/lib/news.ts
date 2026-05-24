// Busca o RSS do Google News para "celebridades brasileiras".
// Retorna lista enxuta (título, fonte, link, data) — sem reproduzir corpo.

const RSS_URL =
  "https://news.google.com/rss/search?q=celebridades+brasileiras&hl=pt-BR&gl=BR&ceid=BR:pt-419";

export type Noticia = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
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

function parseItems(xml: string): Noticia[] {
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return itemMatches
    .map((item) => {
      const titleRaw = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
      const linkRaw = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "";
      const pubRaw = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
      const sourceRaw = item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "";

      const title = decode(stripCdata(titleRaw));
      const link = decode(stripCdata(linkRaw));
      const source = decode(stripCdata(sourceRaw));
      const pubDate = stripCdata(pubRaw);

      // Google News costuma sufixar o título com " - Fonte". Limpa.
      const cleanTitle = source
        ? title.replace(new RegExp(`\\s*-\\s*${source.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\s*$`), "")
        : title;

      return { title: cleanTitle, link, source, pubDate };
    })
    .filter((n) => n.title && n.link);
}

export async function fetchNoticias(): Promise<Noticia[]> {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "FamaIA/1.0 (+https://github.com/leandrormartins/teste)" },
    });
    if (!res.ok) {
      console.warn(`[news] RSS retornou HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseItems(xml).slice(0, 12);
  } catch (err) {
    console.error("[news] erro ao buscar RSS:", err);
    return [];
  }
}
