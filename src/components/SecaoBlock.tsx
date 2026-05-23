import type { Famoso } from "@prisma/client";
import { gerarConteudo } from "@/lib/ai";
import { SECAO_LABELS, type Secao } from "@/lib/secoes";

export async function SecaoBlock({ famoso, secao }: { famoso: Famoso; secao: Secao }) {
  let texto: string;
  try {
    texto = await gerarConteudo(famoso, secao);
  } catch (err) {
    console.error(`Falha ao gerar seção ${secao} para ${famoso.slug}:`, err);
    return (
      <section className="rounded-xl bg-white p-5 ring-1 ring-gray-200">
        <h2 className="mb-2 text-lg font-bold text-primary">{SECAO_LABELS[secao]}</h2>
        <p className="text-sm text-gray-500">
          Não foi possível gerar este trecho agora. Tente recarregar em instantes.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-white p-5 ring-1 ring-gray-200">
      <h2 className="mb-2 text-lg font-bold text-primary">{SECAO_LABELS[secao]}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-800">
        {texto.split(/\n\n+/).map((par, i) => (
          <p key={i}>{par}</p>
        ))}
      </div>
    </section>
  );
}

export function SecaoBlockSkeleton({ secao }: { secao: Secao }) {
  return (
    <section className="rounded-xl bg-white p-5 ring-1 ring-gray-200">
      <h2 className="mb-2 text-lg font-bold text-primary">{SECAO_LABELS[secao]}</h2>
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-11/12 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </section>
  );
}
