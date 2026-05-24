import Link from "next/link";
import { porCategoria } from "@/lib/famosos";
import { FamosoCard } from "@/components/FamosoCard";

export default function CategoriaPage({ params }: { params: { nome: string } }) {
  const categoria = decodeURIComponent(params.nome);
  const famosos = porCategoria(categoria);

  return (
    <div className="space-y-6">
      <header>
        <Link href="/" className="text-sm text-primary hover:underline">
          &larr; Voltar
        </Link>
        <h1 className="mt-1 text-3xl font-extrabold text-gray-900">{categoria}</h1>
        <p className="text-sm text-gray-600">
          {famosos.length} {famosos.length === 1 ? "famoso" : "famosos"} nesta categoria.
        </p>
      </header>

      {famosos.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-gray-500 ring-1 ring-gray-200">
          Ainda não há famosos cadastrados em <strong>{categoria}</strong>.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {famosos.map((f) => (
            <FamosoCard key={f.slug} famoso={f} />
          ))}
        </div>
      )}
    </div>
  );
}
