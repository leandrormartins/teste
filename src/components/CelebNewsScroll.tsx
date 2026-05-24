import type { NoticiaCeleb } from "@/lib/news-per-celeb";
import { tempoRelativo } from "@/lib/time";

export function CelebNewsScroll({
  items,
  nome,
}: {
  items: NoticiaCeleb[];
  nome: string;
}) {
  if (items.length === 0) return null;

  const primeiroNome = nome.split(" ")[0];

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-gray-900">{primeiroNome} nas notícias</h2>
        <span className="text-xs text-gray-500">via Google News</span>
      </div>
      <div className="-mx-4 overflow-x-auto px-4">
        <ul className="flex snap-x snap-mandatory gap-3 pb-2">
          {items.map((item, i) => (
            <li key={i} className="w-72 shrink-0 snap-start">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-xl bg-white p-4 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.source || "Fonte"}
                </p>
                <h3 className="mt-1 line-clamp-3 text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-auto pt-3 text-xs text-gray-500">
                  {tempoRelativo(item.pubDate)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
