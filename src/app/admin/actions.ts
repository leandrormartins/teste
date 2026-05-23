"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { CATEGORIAS } from "@/lib/categorias";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export type CadastroState = { erro?: string } | null;

export async function cadastrarFamoso(
  _prev: CadastroState,
  formData: FormData,
): Promise<CadastroState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim();
  const fotoUrl = String(formData.get("fotoUrl") ?? "").trim();

  if (!nome || nome.length < 2) return { erro: "Informe um nome válido." };
  if (!(CATEGORIAS as readonly string[]).includes(categoria)) {
    return { erro: "Categoria inválida." };
  }
  if (!/^https?:\/\/.+/.test(fotoUrl)) {
    return { erro: "URL da foto deve começar com http(s)://" };
  }

  const slug = slugify(nome);
  if (!slug) return { erro: "Nome resulta em slug vazio." };

  const existente = await prisma.famoso.findUnique({ where: { slug } });
  if (existente) return { erro: "Já existe um famoso com esse nome." };

  await prisma.famoso.create({
    data: { slug, nome, categoria, fotoUrl },
  });

  revalidatePath("/");
  revalidatePath(`/categoria/${encodeURIComponent(categoria)}`);
  redirect(`/famoso/${slug}`);
}
