// Métricas decorativas geradas a partir do slug — determinísticas, sempre
// o mesmo número pro mesmo famoso. Não é tracking real, é só pra UI ter
// algo plausível enquanto não temos analytics de verdade.

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function fakeViews(slug: string): number {
  return (hash(slug + ":views") % 4800) + 200;
}

export function formatViews(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return (k >= 10 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, "")) + "k";
  }
  return String(n);
}
