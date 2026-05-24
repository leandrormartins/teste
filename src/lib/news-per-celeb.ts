// Notícias filtradas por celebridade(s) da nossa base.

import { FAMOSOS } from "./famosos";
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

// Notícias para uma celebridade específica (perfil)
export async function fetchNoticiasDe(nome: string): Promise<Noticia[]> {
  if (!nome) return [];
  const pool = await fetchNoticias(100);
  return pool.filter((n) => matchNome(n.title, nome)).slice(0, 8);
}

// Notícias que mencionam QUALQUER um dos 50 famosos da base (home feed)
export async function fetchNoticiasComFamosos(limit = 12): Promise<Noticia[]> {
  const pool = await fetchNoticias(100);
  return pool
    .filter((n) => FAMOSOS.some((f) => matchNome(n.title, f.nome)))
    .slice(0, limit);
}
