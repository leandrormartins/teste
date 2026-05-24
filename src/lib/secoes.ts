export const SECOES = ["amorosa", "patrimonio", "curiosidades", "polemicas"] as const;

export type Secao = (typeof SECOES)[number];

export const SECAO_LABELS: Record<Secao, string> = {
  amorosa: "Vida Amorosa",
  patrimonio: "Patrimônio Estimado",
  curiosidades: "Curiosidades",
  polemicas: "Polêmicas Recentes",
};

export const SECAO_EMOJI: Record<Secao, string> = {
  amorosa: "💖",
  patrimonio: "💰",
  curiosidades: "💡",
  polemicas: "🔥",
};

export function isSecao(value: string): value is Secao {
  return (SECOES as readonly string[]).includes(value);
}
