// Monta a URL do nosso proxy de imagens para uma URL externa.
// Retorna null se a entrada for null/undefined/vazia (cards caem no placeholder).
export function imgProxy(url: string | null | undefined): string | null {
  if (!url) return null;
  return `/api/img?url=${encodeURIComponent(url)}`;
}
