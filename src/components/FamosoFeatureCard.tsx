import Link from "next/link";
import type { Celebridade } from "@/lib/famosos";
import { imgProxy } from "@/lib/img-proxy";

const CATEGORIA_EMOJI: Record<string, string> = {
  "Música": "🎤",
  "Novela": "🎬",
  "Esportes": "🏆",
  "Influencers": "📱",
};

export function FamosoFeatureCard({ famoso }: { famoso: Celebridade }) {
  const emoji = CATEGORIA_EMOJI[famoso.categoria] ?? "✨";
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
      <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur">
        {emoji}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
        <h3 className="text-balance text-lg font-extrabold leading-tight text-white drop-shadow-md">
          {famoso.nome}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-white/80">{famoso.categoria}</p>
      </div>
    </Link>
  );
}
