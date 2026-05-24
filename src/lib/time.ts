// Util pequena pra formatar tempo relativo ("3h atrás", "2d atrás").
// Compartilhada entre NewsFeed (home) e CelebNewsScroll (perfil).

export function tempoRelativo(dataStr: string): string {
  if (!dataStr) return "";
  const data = new Date(dataStr);
  if (isNaN(data.getTime())) return "";
  const diffMs = Date.now() - data.getTime();
  const h = Math.floor(diffMs / 3_600_000);
  if (h < 1) {
    const m = Math.max(1, Math.floor(diffMs / 60_000));
    return `${m} min atrás`;
  }
  if (h < 24) return `${h}h atrás`;
  const d = Math.floor(h / 24);
  return `${d}d atrás`;
}
