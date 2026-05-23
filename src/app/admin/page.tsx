"use client";

import { useFormState, useFormStatus } from "react-dom";
import { cadastrarFamoso, type CadastroState } from "./actions";
import { CATEGORIAS } from "@/lib/categorias";

function BotaoSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
    >
      {pending ? "Cadastrando..." : "Cadastrar famoso"}
    </button>
  );
}

export default function AdminPage() {
  const [state, formAction] = useFormState<CadastroState, FormData>(
    cadastrarFamoso,
    null,
  );

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-gray-900">Cadastrar famoso</h1>
      <p className="mt-1 text-sm text-gray-600">
        Cadastre um novo famoso. O conteúdo das seções será gerado por IA quando alguém
        visitar a página.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">Nome</span>
          <input
            name="nome"
            required
            minLength={2}
            maxLength={120}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary-200"
            placeholder="Ex: Beatriz Marques"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Categoria</span>
          <select
            name="categoria"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary-200"
            defaultValue=""
          >
            <option value="" disabled>
              Selecione...
            </option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">URL da foto</span>
          <input
            name="fotoUrl"
            type="url"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary-200"
            placeholder="https://..."
          />
          <span className="mt-1 block text-xs text-gray-500">
            Domínios permitidos: picsum.photos, images.unsplash.com (veja next.config.mjs).
          </span>
        </label>

        {state?.erro && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {state.erro}
          </p>
        )}

        <BotaoSubmit />
      </form>
    </div>
  );
}
