// Busca notícias recentes mencionando uma celebridade específica
// usando o RSS de busca do Google News. Diferente de news.ts (que
// agrega RSS direto de veículos), aqui o filtro é por nome — usamos
// o agregador porque seria custoso varrer N feeds de veículos por celeb.
//
// Cards na UI levam direto pro Google News (target=_blank) — não tentamos
// resolver pra fonte porque o token virou criptografado.

export type NoticiaCeleb = {
  title: string;
  source: string;
  link: string;
  pubDate: string;
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

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

export async function fetchNoticiasDe(nome: string): Promise<NoticiaCeleb[]> {
  if (!nome) return [];
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(nome)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items
      .map((item) => {
        const titleRaw = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
        const linkRaw = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "";
        const pubRaw = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
        const sourceRaw =
          item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "";
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
      .filter((n) => n.title && n.link)
      .slice(0, 8);
  } catch (err) {
    console.error("[news-per-celeb] erro:", err);
    return [];
  }
}
