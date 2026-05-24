import Link from "next/link";
import type { Noticia } from "@/lib/news";
import { imgProxy } from "@/lib/img-proxy";
import { tempoRelativo } from "@/lib/time";

export function CelebNewsScroll({
  items,
  nome,
}: {
  items: Noticia[];
  nome: string;
}) {
  if (items.length === 0) return null;

  const primeiroNome = nome.split(" ")[0];

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          {primeiroNome} nas notícias
        </h2>
        <span className="text-xs text-gray-500">via RSS de veículos brasileiros</span>
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
                      src={imgProxy(item.image) ?? ""}
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
