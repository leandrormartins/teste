import { FAMOSOS, porCategoria, buscar } from "@/lib/famosos";
import { fetchNoticiasComFamosos } from "@/lib/news-per-celeb";
import { Logo } from "@/components/Logo";
import { RandomButton } from "@/components/RandomButton";
import { FamosoSquareCard } from "@/components/FamosoSquareCard";
import { FamosoFeatureCard } from "@/components/FamosoFeatureCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsFeed } from "@/components/NewsFeed";

type SearchParams = { q?: string; cat?: string };

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? "").trim();
  const cat = searchParams.cat;

  const todosOuFiltrados = cat ? porCategoria(cat) : [...FAMOSOS];
  const emAlta = q ? buscar(q) : todosOuFiltrados;
  const emDestaque = [...FAMOSOS].slice(0, 8);
  const destaquesSemana = [...FAMOSOS].slice(8, 14);

  const noticias = await fetchNoticiasComFamosos(8);

  return (
    <div className="space-y-10 pt-4">
      <section className="space-y-4">
        <Logo />
        <p className="text-sm text-gray-600 md:text-base">
          Descubra tudo sobre seus famosos favoritos
        </p>
        <RandomButton />
        <form action="/" method="get" className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="search"
            name="q"
            placeholder="Buscar qualquer famoso..."
            defaultValue={q}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-5 text-sm outline-none placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-200"
          />
        </form>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-gray-900">
            <span className="text-pink-500">💗</span> Em Destaque
          </h2>
          <span className="text-xs font-semibold text-gray-400">{emDestaque.length} ›</span>
        </div>
        <div className="-mx-4 overflow-x-auto px-4">
          <ul className="flex snap-x snap-mandatory gap-3 pb-2">
            {emDestaque.map((f) => (
              <li key={f.slug} className="w-32 shrink-0 snap-start sm:w-36">
                <FamosoSquareCard famoso={f} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-gray-900">
            <span>🏆</span> Destaques da Semana
          </h2>
        </div>
        <div className="-mx-4 overflow-x-auto px-4">
          <ul className="flex snap-x snap-mandatory gap-3 pb-2">
            {destaquesSemana.map((f) => (
              <li key={f.slug} className="w-56 shrink-0 snap-start sm:w-64">
                <FamosoFeatureCard famoso={f} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-3">
          <h2 className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-gray-900">
            <span className="text-primary">📈</span> Em Alta Agora
          </h2>
        </div>
        <div className="mb-4">
          <CategoryFilter active={cat} />
        </div>
        {emAlta.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-gray-500 ring-1 ring-gray-200">
            Nenhum famoso encontrado.
          </p>
        ) : (
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {emAlta.map((f) => (
              <li key={f.slug}>
                <FamosoSquareCard famoso={f} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <NewsFeed items={noticias} />
    </div>
  );
}
