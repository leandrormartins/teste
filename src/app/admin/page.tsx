import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
      <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
        <p className="text-sm text-amber-900">
          <strong>Modo JSON ativo.</strong> O feed lê de{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">src/data/famosos.json</code>.
          Para adicionar famosos, edite esse arquivo (ou rode{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">node scripts/gen-famosos.mjs</code>
          ) e faça commit. O deploy seguinte da Vercel já mostra os novos.
        </p>
      </div>
      <p className="text-sm text-gray-600">
        O cadastro via formulário está desativado nesse modo porque cadastros novos no
        banco (Postgres) não apareceriam no feed JSON. Para voltar a usar o banco como
        fonte, basta restaurar as páginas para a versão anterior.
      </p>
      <Link href="/" className="inline-block text-sm text-primary hover:underline">
        &larr; Voltar para a home
      </Link>
    </div>
  );
}
