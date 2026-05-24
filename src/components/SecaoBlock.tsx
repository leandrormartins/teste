"use client";

import { useState } from "react";
import { SECAO_EMOJI, SECAO_LABELS, type Secao } from "@/lib/secoes";

const MIN_CHARS_PARA_EXPANDIR = 200;

export function SecaoBlock({ texto, secao }: { texto: string; secao: Secao }) {
  const [expandido, setExpandido] = useState(false);
  const podeExpandir = texto.length > MIN_CHARS_PARA_EXPANDIR;

  return (
    <section className="rounded-xl bg-white p-5 ring-1 ring-gray-200">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-primary">
        <span aria-hidden className="text-xl">
          {SECAO_EMOJI[secao]}
        </span>
        {SECAO_LABELS[secao]}
      </h2>
      <div
        className={
          (expandido ? "" : "line-clamp-3 ") +
          "whitespace-pre-line text-sm leading-relaxed text-gray-800"
        }
      >
        {texto}
      </div>
      {podeExpandir && (
        <button
          type="button"
          onClick={() => setExpandido((v) => !v)}
          className="mt-3 text-xs font-semibold text-primary hover:underline"
          aria-expanded={expandido}
        >
          {expandido ? "Ver menos ↑" : "Ver mais ↓"}
        </button>
      )}
    </section>
  );
}
