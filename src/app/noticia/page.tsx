import Link from "next/link";
import { fetchNoticiaDetalhe } from "@/lib/news-detail";
import { imgProxy } from "@/lib/img-proxy";

type SearchParams = { url?: string };

export default async function NoticiaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const url = searchParams.url?.trim();

  if (!url) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-gray-600">URL da notícia não foi informada.</p>
        <Link href="/" className="mt-4 inline-block text-primary hover:underline">
          ← Voltar pra home
        </Link>
      </div>
    );
  }

  const detalhe = await fetchNoticiaDetalhe(url);

  if (!detalhe) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-gray-700">
          Não foi possível carregar essa notícia agora — talvez o veículo esteja
          bloqueando o acesso, ou o link tenha expirado.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Abrir no Google News →
        </a>
        <div className="mt-4">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Voltar pra home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Voltar pra home
      </Link>

      {detalhe.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgProxy(detalhe.image) ?? ""}
          alt={detalhe.title}
          className="max-h-96 w-full rounded-xl bg-gray-100 object-cover"
        />
      )}

      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {detalhe.sourceHost}
      </p>

      <h1 className="text-balance text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">
        {detalhe.title}
      </h1>

      {detalhe.description && (
        <p className="text-base leading-relaxed text-gray-700">
          {detalhe.description}
        </p>
      )}

      <div className="mt-6 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-200">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-700">
          Matéria original
        </p>
        <a
          href={detalhe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block break-words text-sm text-primary hover:underline"
        >
          {detalhe.sourceUrl}
        </a>
        <a
          href={detalhe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Ler matéria completa em {detalhe.sourceHost} →
        </a>
      </div>

      <p className="pt-2 text-xs text-gray-500">
        Esta página exibe apenas título, descrição curta e imagem de
        compartilhamento publicados pelo próprio veículo (meta tags Open Graph).
        Para o conteúdo completo, acesse a fonte original.
      </p>
    </article>
  );
}
