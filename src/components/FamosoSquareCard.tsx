import Link from "next/link";
import type { Celebridade } from "@/lib/famosos";
import { imgProxy } from "@/lib/img-proxy";

export function FamosoSquareCard({ famoso }: { famoso: Celebridade }) {
  return (
    <Link
      href={`/famoso/${famoso.slug}`}
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 transition hover:ring-primary-300"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgProxy(famoso.fotoUrl) ?? famoso.fotoUrl}
        alt={famoso.nome}
        loading="lazy"
        className="h-full w-full object-cover transition group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5">
        <p className="line-clamp-2 text-xs font-bold leading-tight text-white drop-shadow-md">
          {famoso.nome}
        </p>
      </div>
    </Link>
  );
}
