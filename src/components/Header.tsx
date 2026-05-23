import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-md bg-primary px-2 py-1 text-white font-bold tracking-tight">
            Fama
          </span>
          <span className="text-2xl font-bold text-primary">IA</span>
        </Link>

        <form action="/" method="get" className="md:ml-4 md:flex-1">
          <input
            type="search"
            name="q"
            placeholder="Buscar famoso..."
            className="w-full rounded-full border border-primary-200 bg-white px-4 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary-200"
          />
        </form>

        <nav className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <ul className="flex gap-1 whitespace-nowrap md:gap-2">
            {CATEGORIAS.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/categoria/${encodeURIComponent(cat)}`}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
                >
                  {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-primary"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
