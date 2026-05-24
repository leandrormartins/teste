import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";

const ICONS: Record<string, string> = {
  Todos: "✨",
  "Música": "🎤",
  "Novela": "🎬",
  "Esportes": "🏆",
  "Influencers": "📱",
};

function pillClass(active: boolean) {
  return active
    ? "flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
    : "flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200";
}

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-2">
        <Link href="/" className={pillClass(!active)}>
          <span>{ICONS["Todos"]}</span> Todos
        </Link>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat}
            href={`/?cat=${encodeURIComponent(cat)}`}
            className={pillClass(active === cat)}
          >
            <span>{ICONS[cat] ?? "•"}</span> {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
