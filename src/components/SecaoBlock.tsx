import { SECAO_LABELS, type Secao } from "@/lib/secoes";

export function SecaoBlock({ texto, secao }: { texto: string; secao: Secao }) {
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
