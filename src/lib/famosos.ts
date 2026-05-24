import data from "@/data/famosos.json";
import type { Secao } from "@/lib/secoes";

export type Conteudos = Record<Secao, string>;

export type Celebridade = {
  slug: string;
  nome: string;
  categoria: string;
  fotoUrl: string;
  conteudos: Conteudos;
};

export const FAMOSOS: readonly Celebridade[] = data as Celebridade[];

export function buscar(q?: string): Celebridade[] {
  if (!q) return [...FAMOSOS];
  const ql = q.toLowerCase().trim();
  if (!ql) return [...FAMOSOS];
  return FAMOSOS.filter((f) => f.nome.toLowerCase().includes(ql));
}

export function porCategoria(categoria: string): Celebridade[] {
  return FAMOSOS.filter((f) => f.categoria === categoria);
}

export function porSlug(slug: string): Celebridade | undefined {
  return FAMOSOS.find((f) => f.slug === slug);
}
