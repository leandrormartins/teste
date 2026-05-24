import Link from "next/link";
import type { Celebridade } from "@/lib/famosos";
import { imgProxy } from "@/lib/img-proxy";

export function FamosoCard({ famoso }: { famoso: Celebridade }) {
  return (
    <Link
      href={`/famoso/${famoso.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgProxy(famoso.fotoUrl) ?? famoso.fotoUrl}
          alt={famoso.nome}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {famoso.categoria}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary">
          {famoso.nome}
        </h3>
      </div>
    </Link>
  );
}
