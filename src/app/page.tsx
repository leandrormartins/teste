import Link from "next/link";
import { prisma } from "@/lib/db";
import { FamosoCard } from "@/components/FamosoCard";
import { CATEGORIAS } from "@/lib/categorias";

type SearchParams = { q?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = (searchParams.q ?? "").trim();

  const famosos = await prisma.famoso.findMany({
    where: q ? { nome: { contains: q } } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-primary-50 via-white to-primary-100 px-6 py-10 text-center md:py-14">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Curiosidades sobre <span className="text-primary">celebridades</span> geradas por IA
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
          Vida amorosa, patrimônio estimado, curiosidades e polêmicas &mdash; tudo no estilo
          revista, escrito por inteligência artificial. Só entretenimento.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {q ? `Resultados para "${q}"` : "Famosos em destaque"}
          </h2>
          {q && (
            <Link href="/" className="text-sm text-primary hover:underline">
              limpar busca
            </Link>
          )}
        </div>

        {famosos.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-gray-500 ring-1 ring-gray-200">
            Nenhum famoso encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {famosos.map((f) => (
              <FamosoCard key={f.id} famoso={f} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Explorar por categoria</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${encodeURIComponent(cat)}`}
              className="rounded-xl bg-white p-4 text-center font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:bg-primary-50 hover:text-primary hover:ring-primary-200"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
