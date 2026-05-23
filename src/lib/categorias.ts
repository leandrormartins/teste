export const CATEGORIAS = ["Música", "Novela", "Esportes", "Influencers"] as const;

export type Categoria = (typeof CATEGORIAS)[number];
