import Link from "next/link";
import type { Celebridade } from "@/lib/famosos";
import { imgProxy } from "@/lib/img-proxy";
import { fakeViews, formatViews } from "@/lib/metrics";

export function FamosoSquareCard({ famoso }: { famoso: Celebridade }) {
  const views = formatViews(fakeViews(famoso.slug));
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
      <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
        <span aria-hidden>👁</span>
        {views}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5">
        <p className="line-clamp-2 text-xs font-bold leading-tight text-white drop-shadow-md">
          {famoso.nome}
        </p>
      </div>
    </Link>
  );
}
