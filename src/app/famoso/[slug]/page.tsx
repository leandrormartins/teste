import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { SecaoBlock, SecaoBlockSkeleton } from "@/components/SecaoBlock";
import { SECOES } from "@/lib/secoes";

export default async function FamosoPage({ params }: { params: { slug: string } }) {
  const famoso = await prisma.famoso.findUnique({ where: { slug: params.slug } });
  if (!famoso) notFound();

  return (
    <div className="space-y-8">
      <header className="grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200 md:grid-cols-[200px_1fr]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 md:w-[200px]">
          <Image
            src={famoso.fotoUrl}
            alt={famoso.nome}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <Link
            href={`/categoria/${encodeURIComponent(famoso.categoria)}`}
            className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            {famoso.categoria}
          </Link>
          <h1 className="mt-1 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {famoso.nome}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            O que se comenta por aí sobre {famoso.nome.split(" ")[0]} &mdash; em quatro
            recortes especulativos escritos por IA. Nada aqui é fato verificado.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {SECOES.map((secao) => (
          <Suspense key={secao} fallback={<SecaoBlockSkeleton secao={secao} />}>
            <SecaoBlock famoso={famoso} secao={secao} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
