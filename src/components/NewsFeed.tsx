import Link from "next/link";
import type { Noticia } from "@/lib/news";

function tempoRelativo(dataStr: string): string {
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

export function NewsFeed({ items }: { items: Noticia[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900">Nas notícias</h2>
        <span className="text-xs text-gray-500">via Google News</span>
      </div>
      <div className="-mx-4 overflow-x-auto px-4">
        <ul className="flex snap-x snap-mandatory gap-3 pb-2">
          {items.map((item, i) => (
            <li key={i} className="w-72 shrink-0 snap-start">
              <Link
                href={`/noticia?url=${encodeURIComponent(item.link)}`}
                className="flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200"
              >
                {item.image ? (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-primary-50 to-primary-100" />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {item.source || "Fonte"}
                  </p>
                  <h3 className="mt-1 line-clamp-3 text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-auto pt-3 text-xs text-gray-500">
                    {tempoRelativo(item.pubDate)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
