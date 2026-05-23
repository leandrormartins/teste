# FamaIA

Portal de curiosidades sobre celebridades brasileiras com conteúdo gerado por IA (Claude `claude-haiku-4-5`). Apenas entretenimento.

> ⚠️ **Disclaimer:** Os textos das seções são especulativos e gerados por IA. Não representam fatos verificáveis sobre as pessoas retratadas.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Prisma 6** + **SQLite** (cache local de conteúdo gerado)
- **Anthropic SDK** (`@anthropic-ai/sdk`)

## Setup local

```bash
# 1. Instalar deps
npm install

# 2. Configurar variáveis
cp .env.example .env
# edite .env e coloque seu ANTHROPIC_API_KEY (https://console.anthropic.com/)

# 3. Migrar e popular o banco (5 famosos fictícios de exemplo)
npm run db:migrate

# 4. Rodar
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Script | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run db:migrate` | Aplica migrations + seed (idempotente) |
| `npm run db:seed` | Roda só o seed |
| `npm run db:studio` | Abre o Prisma Studio para inspecionar o banco |

## Estrutura

```
src/
├── app/
│   ├── page.tsx                     # Home: hero + busca + grid + categorias
│   ├── famoso/[slug]/page.tsx       # Perfil: foto + 4 seções com Suspense
│   ├── categoria/[nome]/page.tsx    # Lista filtrada por categoria
│   └── admin/                       # Cadastro de novos famosos (Server Action)
├── components/                      # Header, Footer, FamosoCard, SecaoBlock
└── lib/
    ├── db.ts                        # Singleton PrismaClient
    ├── ai.ts                        # gerarConteudo() com cache de 7 dias
    ├── secoes.ts                    # Enum das 4 seções
    └── categorias.ts                # Categorias do menu

prisma/
├── schema.prisma                    # Famoso + Conteudo
├── migrations/                      # Migrations versionadas
└── seed.ts                          # 5 famosos fictícios
```

## Como o cache funciona

Cada combinação `(famosoId, seção)` é cacheada por **7 dias** na tabela `Conteudo`:

1. `gerarConteudo(famoso, secao)` consulta o cache primeiro.
2. Se `geradoEm` < 7 dias → retorna o texto cacheado.
3. Senão → chama a API Claude (`claude-haiku-4-5`), faz upsert e retorna.

O perfil tem 4 seções (`amorosa`, `patrimonio`, `curiosidades`, `polemicas`) e usa `<Suspense>` para que cada bloco apareça assim que pronto (streaming).

## Guardrails da IA

O system prompt em `src/lib/ai.ts` impõe **regras invioláveis**:

- Sem fatos verificáveis (datas, valores exatos, nomes de parceiros, endereços).
- Sempre especulativo ("comenta-se", "fãs imaginam", "circulam rumores").
- Sem difamação (acusações criminais, sexuais, médicas, financeiras).
- 2-3 parágrafos curtos, máximo ~200 palavras.

O disclaimer global está fixo no footer.

## Cadastrando novos famosos

Vá em `/admin`, preencha nome + categoria + URL da foto. Slug é gerado automaticamente. O conteúdo das seções é gerado na primeira visita ao perfil.

> Para usar fotos de outros domínios, adicione o host em `next.config.mjs` (`images.remotePatterns`).

## Deploy na Vercel

1. Push do repositório para o GitHub.
2. Importe na Vercel.
3. Configure as env vars: `ANTHROPIC_API_KEY` e `DATABASE_URL` (Vercel não persiste SQLite — para produção, troque por Postgres/Turso e atualize `provider` em `schema.prisma`).
