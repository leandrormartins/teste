import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Famosos fictícios — nomes inventados, não correspondem a pessoas reais.
const famosos = [
  {
    slug: "adriana-cordeiro",
    nome: "Adriana Cordeiro",
    categoria: "Música",
    fotoUrl: "https://picsum.photos/seed/adriana-cordeiro/600/800",
  },
  {
    slug: "lucas-vianna",
    nome: "Lucas Vianna",
    categoria: "Novela",
    fotoUrl: "https://picsum.photos/seed/lucas-vianna/600/800",
  },
  {
    slug: "bruno-falcao",
    nome: "Bruno Falcão",
    categoria: "Esportes",
    fotoUrl: "https://picsum.photos/seed/bruno-falcao/600/800",
  },
  {
    slug: "carolina-reis",
    nome: "Carolina Reis",
    categoria: "Influencers",
    fotoUrl: "https://picsum.photos/seed/carolina-reis/600/800",
  },
  {
    slug: "pedro-almada",
    nome: "Pedro Almada",
    categoria: "Música",
    fotoUrl: "https://picsum.photos/seed/pedro-almada/600/800",
  },
];

async function main() {
  for (const f of famosos) {
    await prisma.famoso.upsert({
      where: { slug: f.slug },
      update: {},
      create: f,
    });
  }
  console.log(`Seed ok: ${famosos.length} famosos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
