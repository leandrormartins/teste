#!/usr/bin/env node
// scripts/update-photo-urls.mjs
// Para cada famoso em src/data/famosos.json, busca a foto principal na
// Wikipedia (pt-BR, com fallback pra en) e atualiza o campo fotoUrl com
// a URL real do upload.wikimedia.org. Mantém o avatar de iniciais para
// quem não tiver artigo.
//
// Roda no build da Vercel antes do next build. Falhas individuais não
// quebram o processo — usuário sem foto fica com avatar mesmo.

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const JSON_PATH = path.join(__dirname, "..", "src", "data", "famosos.json");

const UA =
  "FamaIA/1.0 (prototype; +https://github.com/leandrormartins/teste) " +
  "[contato via repo]";

const CONCURRENCY = 5;

// Para casos em que o nome no nosso JSON não bate com o título do artigo
// na Wikipedia. Mapeia slug → título preferido para busca.
const TITULO_OVERRIDE = {
  "neymar-jr": "Neymar",
  "vinicius-jr": "Vinícius Júnior",
  "ronaldo-fenomeno": "Ronaldo (futebolista)",
  "marta": "Marta Vieira da Silva",
  "sandy": "Sandy (cantora)",
  "ludmilla": "Ludmilla (cantora)",
  "anitta": "Anitta",
  "gkay": "Géssica Kayane",
  "bia-haddad-maia": "Beatriz Haddad Maia",
  "bia-souza": "Beatriz Souza",
  "alisson-becker": "Alisson Becker",
  "tata-werneck": "Tatá Werneck",
};

async function fetchThumb(lang, title) {
  const apiUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.originalimage?.source ?? data?.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

async function resolveFoto(celeb) {
  const titulo = TITULO_OVERRIDE[celeb.slug] ?? celeb.nome;
  // 1) tenta pt-BR
  const ptUrl = await fetchThumb("pt", titulo);
  if (ptUrl) return ptUrl;
  // 2) fallback en
  const enUrl = await fetchThumb("en", titulo);
  if (enUrl) return enUrl;
  // 3) último recurso: tenta sem override (nome puro)
  if (TITULO_OVERRIDE[celeb.slug]) {
    const fallback =
      (await fetchThumb("pt", celeb.nome)) ?? (await fetchThumb("en", celeb.nome));
    if (fallback) return fallback;
  }
  return null;
}

async function processBatch(batch) {
  return Promise.all(
    batch.map(async (celeb) => {
      const found = await resolveFoto(celeb);
      return { celeb, found };
    }),
  );
}

async function main() {
  const raw = await fs.readFile(JSON_PATH, "utf-8");
  const famosos = JSON.parse(raw);

  let ok = 0;
  let semFoto = 0;
  for (let i = 0; i < famosos.length; i += CONCURRENCY) {
    const batch = famosos.slice(i, i + CONCURRENCY);
    const results = await processBatch(batch);
    for (const { celeb, found } of results) {
      if (found) {
        celeb.fotoUrl = found;
        ok++;
        console.log(`✓ ${celeb.nome}`);
      } else {
        semFoto++;
        console.log(`· ${celeb.nome} (mantém avatar)`);
      }
    }
  }

  await fs.writeFile(JSON_PATH, JSON.stringify(famosos, null, 2) + "\n");
  console.log(`\n${ok} famosos com foto Wikipedia, ${semFoto} com avatar fallback.`);
}

main().catch((err) => {
  console.error("[update-photo-urls] falha geral:", err);
  // Não bloqueia o build — segue com avatares
  process.exit(0);
});
