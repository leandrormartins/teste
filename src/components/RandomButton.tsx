"use client";

import { FAMOSOS } from "@/lib/famosos";
import { useRouter } from "next/navigation";

export function RandomButton() {
  const router = useRouter();

  const onClick = () => {
    if (FAMOSOS.length === 0) return;
    const escolhido = FAMOSOS[Math.floor(Math.random() * FAMOSOS.length)];
    router.push(`/famoso/${escolhido.slug}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-6 py-4 text-base font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
    >
      <span className="text-2xl">🎲</span>
      Famoso Aleatório
    </button>
  );
}
