import Image from "next/image";
import Link from "next/link";
import type { Famoso } from "@prisma/client";

export function FamosoCard({ famoso }: { famoso: Famoso }) {
  return (
    <Link
      href={`/famoso/${famoso.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={famoso.fotoUrl}
          alt={famoso.nome}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {famoso.categoria}
        </p>
        <h3 className="mt-1 text-base font-semibold text-gray-900 group-hover:text-primary">
          {famoso.nome}
        </h3>
      </div>
    </Link>
  );
}
