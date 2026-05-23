-- Seed inicial: 5 famosos fictícios.
-- Use este arquivo no SQL Editor do Neon (ou outro Postgres) caso não consiga
-- rodar `npm run db:seed` localmente. É idempotente (ON CONFLICT DO NOTHING).

INSERT INTO "Famoso" ("id", "slug", "nome", "categoria", "fotoUrl") VALUES
  ('seed_adriana', 'adriana-cordeiro', 'Adriana Cordeiro', 'Música',      'https://picsum.photos/seed/adriana-cordeiro/600/800'),
  ('seed_lucas',   'lucas-vianna',     'Lucas Vianna',     'Novela',      'https://picsum.photos/seed/lucas-vianna/600/800'),
  ('seed_bruno',   'bruno-falcao',     'Bruno Falcão',     'Esportes',    'https://picsum.photos/seed/bruno-falcao/600/800'),
  ('seed_carol',   'carolina-reis',    'Carolina Reis',    'Influencers', 'https://picsum.photos/seed/carolina-reis/600/800'),
  ('seed_pedro',   'pedro-almada',     'Pedro Almada',     'Música',      'https://picsum.photos/seed/pedro-almada/600/800')
ON CONFLICT ("slug") DO NOTHING;
