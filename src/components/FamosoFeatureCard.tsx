import Link from "next/link";
import type { Celebridade } from "@/lib/famosos";
import { imgProxy } from "@/lib/img-proxy";
import { fakeViews, formatViews } from "@/lib/metrics";

const CATEGORIA_EMOJI: Record<string, string> = {
  "Música": "🎤",
  "Novela": "🎬",
  "Esportes": "🏆",
  "Influencers": "📱",
};

export function FamosoFeatureCard({
  famoso,
  rank,
}: {
  famoso: Celebridade;
  rank?: number;
}) {
  const emoji = CATEGORIA_EMOJI[famoso.categoria] ?? "✨";
  const views = formatViews(fakeViews(famoso.slug));
  return (
    <Link
      href={`/famoso/${famoso.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:ring-primary-300"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgProxy(famoso.fotoUrl) ?? famoso.fotoUrl}
        alt={famoso.nome}
        loading="lazy"
        className="h-full w-full object-cover transition group-hover:scale-105"
      />
      {rank != null && (
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-base font-bold text-yellow-700 shadow-sm">
          <span className="text-xl">🥇</span>
          <span className="sr-only">Posição {rank}</span>
        </div>
      )}
      <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-sm shadow-sm backdrop-blur">
        <span>{emoji}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
        <h3 className="text-balance text-lg font-extrabold leading-tight text-white drop-shadow-md">
          {famoso.nome}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-white/85">
          <span>{famoso.categoria}</span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden>👁</span>
            {views}
          </span>
        </div>
      </div>
    </Link>
  );
}
