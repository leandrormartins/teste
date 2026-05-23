import Anthropic from "@anthropic-ai/sdk";
import type { Famoso } from "@prisma/client";
import { prisma } from "@/lib/db";
import { SECAO_LABELS, type Secao } from "@/lib/secoes";

const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

const client = new Anthropic();

const SYSTEM_PROMPT = `Você é um redator de uma revista de entretenimento brasileira. Produz textos curtos, leves e curiosos sobre celebridades — no estilo de uma coluna de fofoca, mas SEM inventar fatos verificáveis.

REGRAS INVIOLÁVEIS:
1. NUNCA cite fatos específicos verificáveis sobre a pessoa: datas, valores monetários exatos, nomes de parceiros românticos reais, endereços, eventos com data, doenças, processos judiciais, acusações criminais ou de traição.
2. Mantenha sempre tom claramente especulativo e genérico, usando expressões como "comenta-se nas redes", "fãs costumam imaginar", "no imaginário do público", "circulam rumores", "alguns acreditam que", "diz a lenda entre fãs".
3. Foque em padrões amplos do tipo de carreira/categoria da pessoa — não em alegações pontuais.
4. Nada de afirmações que possam difamar: sem acusações criminais, sexuais, médicas ou financeiras específicas.
5. Português brasileiro, 2 a 3 parágrafos curtos, máximo 200 palavras no total.
6. NÃO inclua disclaimer ao final — apenas o texto da seção.`;

async function gerarTextoViaClaude(famoso: Famoso, secao: Secao): Promise<string> {
  const label = SECAO_LABELS[secao];
  const nome = famoso.nome.slice(0, 120);
  const categoria = famoso.categoria.slice(0, 60);

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Escreva a seção "${label}" sobre a celebridade "${nome}" (categoria: ${categoria}).`,
      },
    ],
  });

  const bloco = response.content.find((b) => b.type === "text");
  if (!bloco || bloco.type !== "text") {
    throw new Error("Resposta da IA sem conteúdo de texto.");
  }
  return bloco.text.trim();
}

export async function gerarConteudo(famoso: Famoso, secao: Secao): Promise<string> {
  const cache = await prisma.conteudo.findUnique({
    where: { famosoId_secao: { famosoId: famoso.id, secao } },
  });

  if (cache && Date.now() - cache.geradoEm.getTime() < SETE_DIAS_MS) {
    return cache.texto;
  }

  const texto = await gerarTextoViaClaude(famoso, secao);

  await prisma.conteudo.upsert({
    where: { famosoId_secao: { famosoId: famoso.id, secao } },
    create: { famosoId: famoso.id, secao, texto },
    update: { texto, geradoEm: new Date() },
  });

  return texto;
}
