import Link from "next/link";
import type { Noticia } from "@/lib/news";
import { imgProxy } from "@/lib/img-proxy";
import { tempoRelativo } from "@/lib/time";

export function NewsFeed({ items }: { items: Noticia[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900">Fofocas das celebridades</h2>
        <span className="text-xs text-gray-500">via RSS de veículos brasileiros</span>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              href={`/noticia?url=${encodeURIComponent(item.link)}`}
              className="block overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200"
            >
              {item.image ? (
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgProxy(item.image) ?? ""}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-primary-50 to-primary-100" />
              )}
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.source || "Fonte"}
                </p>
                <h3 className="mt-1 line-clamp-2 text-base font-bold text-gray-900">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}
                <p className="mt-3 text-xs text-gray-500">
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
