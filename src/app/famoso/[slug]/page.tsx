import Link from "next/link";
import { notFound } from "next/navigation";
import { porSlug } from "@/lib/famosos";
import { fetchNoticiasDe } from "@/lib/news-per-celeb";
import { imgProxy } from "@/lib/img-proxy";
import { SecaoBlock } from "@/components/SecaoBlock";
import { CelebNewsScroll } from "@/components/CelebNewsScroll";
import { SECOES } from "@/lib/secoes";

export default async function FamosoPage({ params }: { params: { slug: string } }) {
  const famoso = porSlug(params.slug);
  if (!famoso) notFound();

  const noticias = await fetchNoticiasDe(famoso.nome);

  return (
    <div className="space-y-8">
      <header className="grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200 md:grid-cols-[200px_1fr]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 md:w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgProxy(famoso.fotoUrl) ?? famoso.fotoUrl}
            alt={famoso.nome}
            className="h-full w-full object-cover"
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

      <CelebNewsScroll items={noticias} nome={famoso.nome} />

      <div className="grid gap-4 md:grid-cols-2">
        {SECOES.map((secao) => (
          <SecaoBlock key={secao} texto={famoso.conteudos[secao]} secao={secao} />
        ))}
      </div>
    </div>
  );
}
