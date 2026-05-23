# FamaIA

Portal de curiosidades sobre celebridades brasileiras com conteúdo gerado por IA (`claude-haiku-4-5`). Apenas entretenimento.

> ⚠️ **Disclaimer:** Os textos das seções são especulativos e gerados por IA. Não representam fatos verificáveis sobre as pessoas retratadas.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Prisma 6** + **PostgreSQL** (cache de conteúdo gerado)
- **Anthropic SDK** (`@anthropic-ai/sdk`)

## Deploy completo pelo celular (Neon + Vercel)

Você precisa de uma conta no [GitHub](https://github.com/) (que já existe), no [Neon](https://neon.tech/) (Postgres grátis) e na [Vercel](https://vercel.com/) (hospedagem grátis). Tudo pelo navegador.

### 1. Banco no Neon

1. Acesse https://neon.tech e faça login com o GitHub.
2. Crie um projeto novo (region preferencialmente `AWS US East (N. Virginia)`).
3. Na tela do projeto, copie a **Connection string** (formato: `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require`). Guarde — você vai colar na Vercel no passo 2.

### 2. Deploy na Vercel

1. Acesse https://vercel.com e faça login com o GitHub.
2. **Add New → Project** → selecione o repositório `leandrormartins/teste`.
3. Em **Configure Project**, abra **Environment Variables** e adicione:
   - `ANTHROPIC_API_KEY` → sua chave do console.anthropic.com
   - `DATABASE_URL` → a connection string do Neon
4. Clique **Deploy**. A Vercel roda `prisma migrate deploy` automaticamente (criando as tabelas no Neon) e depois `next build`.
5. Quando terminar, abra a URL gerada (`https://teste-xxx.vercel.app`).

### 3. Popular o banco (uma vez)

A home vai aparecer vazia porque o banco ainda não tem famosos. Para popular:

1. No painel do Neon, abra **SQL Editor**.
2. Cole o conteúdo de [`prisma/seed.sql`](prisma/seed.sql) e execute.
3. Volte na URL da Vercel e dê F5 — os 5 famosos vão aparecer.

Para adicionar mais famosos depois: use a página `/admin` no próprio site.

## Setup local (opcional)

Se quiser rodar localmente em algum momento:

```bash
cp .env.example .env
# edite .env com ANTHROPIC_API_KEY e DATABASE_URL (Postgres)
npm install
npm run db:migrate    # aplica schema + roda seed
npm run dev
```

## Scripts

| Script | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Aplica migrations no banco e faz build de produção |
| `npm run db:migrate` | Migrations + seed para dev local |
| `npm run db:seed` | Só o seed via Prisma (Node) |
| `npm run db:studio` | Prisma Studio para inspecionar o banco |

## Estrutura

```
src/
├── app/
│   ├── page.tsx                     # Home: hero + busca + grid + categorias
│   ├── famoso/[slug]/page.tsx       # Perfil: foto + 4 seções com Suspense
│   ├── categoria/[nome]/page.tsx    # Lista filtrada por categoria
│   └── admin/                       # Cadastro via Server Action
├── components/                      # Header, Footer, FamosoCard, SecaoBlock
└── lib/
    ├── db.ts                        # Singleton PrismaClient
    ├── ai.ts                        # gerarConteudo() com cache de 7 dias
    ├── secoes.ts                    # Enum das 4 seções
    └── categorias.ts                # Categorias do menu

prisma/
├── schema.prisma                    # Famoso + Conteudo (Postgres)
├── migrations/                      # Migrations versionadas
├── seed.ts                          # Seed via Prisma (para uso local)
└── seed.sql                         # Seed em SQL puro (para colar no Neon)
```

## Como o cache funciona

Cada combinação `(famosoId, seção)` é cacheada por **7 dias** na tabela `Conteudo`:

1. `gerarConteudo(famoso, secao)` consulta o cache primeiro.
2. Se `geradoEm` < 7 dias → retorna o texto cacheado.
3. Senão → chama a API Claude, faz upsert e retorna.

O perfil tem 4 seções (`amorosa`, `patrimonio`, `curiosidades`, `polemicas`) e usa `<Suspense>` — cada bloco aparece assim que pronto, sem travar a página inteira.

## Guardrails da IA

O system prompt em `src/lib/ai.ts` impõe **regras invioláveis**:

- Sem fatos verificáveis (datas, valores exatos, nomes de parceiros, endereços).
- Sempre especulativo ("comenta-se", "fãs imaginam", "circulam rumores").
- Sem difamação (acusações criminais, sexuais, médicas, financeiras).
- 2-3 parágrafos curtos, máximo ~200 palavras.

Disclaimer global fixo no footer do site.
