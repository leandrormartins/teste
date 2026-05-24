// Busca o RSS do Google News para "celebridades brasileiras" e enriquece
// cada item com a thumb (og:image) da matéria original.
// Retorna lista enxuta — sem reproduzir corpo das matérias.

import { fetchNoticiaDetalhe } from "./news-detail";

const RSS_URL =
  "https://news.google.com/rss/search?q=celebridades+brasileiras&hl=pt-BR&gl=BR&ceid=BR:pt-419";

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

type ItemBase = Omit<Noticia, "image">;

function parseItems(xml: string): ItemBase[] {
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

      const cleanTitle = source
        ? title.replace(
            new RegExp(
              `\\s*-\\s*${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
            ),
            "",
          )
        : title;

      return { title: cleanTitle, link, source, pubDate };
    })
    .filter((n) => n.title && n.link);
}

export async function fetchNoticias(): Promise<Noticia[]> {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "FamaIA/1.0 (+https://github.com/leandrormartins/teste)",
      },
    });
    if (!res.ok) {
      console.warn(`[news] RSS retornou HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    const base = parseItems(xml).slice(0, 12);

    // Enriquece em paralelo: busca og:image de cada matéria.
    // Cada chamada é cacheada por 1h (Next.js fetch revalidate em news-detail).
    const enriched = await Promise.all(
      base.map(async (item) => {
        const det = await fetchNoticiaDetalhe(item.link).catch(() => null);
        return { ...item, image: det?.image ?? null };
      }),
    );

    return enriched;
  } catch (err) {
    console.error("[news] erro ao buscar RSS:", err);
    return [];
  }
}
