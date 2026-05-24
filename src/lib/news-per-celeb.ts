// Notícias filtradas pelo nome de uma celebridade.
//
// Em vez de buscar no Google News (que devolve URLs criptografadas e
// sem thumb), filtramos o mesmo pool agregado dos RSS de veículos
// brasileiros usado pelo feed da home. Vantagens: thumbs reais e
// URLs diretas que abrem em /noticia. Trade-off: só aparecem celebs
// mencionadas nos veículos que estamos agregando — celebridades
// sem cobertura recente vão mostrar feed vazio.

import { fetchNoticias, type Noticia } from "./news";

// Considera só palavras com 4+ chars (evita "Jr.", "Maia", "Vieira"
// como filtro fraco), exige que TODAS apareçam no título — assim
// "Bruna Marquezine" não pega notícia genérica sobre Bruna alguma.
function matchNome(title: string, nome: string): boolean {
  const titleLower = title.toLowerCase();
  const palavras = nome
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 4 && w !== "junior" && w !== "fenomeno");
  if (palavras.length === 0) {
    return titleLower.includes(nome.toLowerCase());
  }
  return palavras.every((p) => titleLower.includes(p));
}

export async function fetchNoticiasDe(nome: string): Promise<Noticia[]> {
  if (!nome) return [];
  // Puxa um pool maior pra ter chance de match por celeb
  const pool = await fetchNoticias(100);
  return pool.filter((n) => matchNome(n.title, nome)).slice(0, 8);
}
