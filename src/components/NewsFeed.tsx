import Link from "next/link";
import type { Noticia } from "@/lib/news";
import { imgProxy } from "@/lib/img-proxy";

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
        <span className="text-xs text-gray-500">via RSS de veículos brasileiros</span>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              href={`/noticia?url=${encodeURIComponent(item.link)}`}
              className="flex gap-3 overflow-hidden rounded-xl bg-white p-3 ring-1 ring-gray-200 transition hover:ring-primary-200"
            >
              {item.image ? (
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-24 sm:w-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgProxy(item.image) ?? ""}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-28 shrink-0 rounded-md bg-gradient-to-br from-primary-50 to-primary-100 sm:h-24 sm:w-36" />
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.source || "Fonte"}
                </p>
                <h3 className="mt-1 line-clamp-3 text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-auto pt-2 text-xs text-gray-500">
                  {tempoRelativo(item.pubDate)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
