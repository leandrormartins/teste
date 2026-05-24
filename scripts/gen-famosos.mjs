#!/usr/bin/env node
// scripts/gen-famosos.mjs
// Gera src/data/famosos.json com 50 celebridades brasileiras e 4 seções
// pré-escritas cada (templates genéricos parametrizados por nome).
//
// Uso: node scripts/gen-famosos.mjs
// Reexecutar regenera o arquivo de forma determinística.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const COR_POR_CATEGORIA = {
  "Música": "e0457b",
  "Novela": "7c3aed",
  "Esportes": "059669",
  "Influencers": "f97316",
};

function avatarUrl(nome, categoria) {
  const sem = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim();
  const param = encodeURIComponent(sem).replace(/%20/g, "+");
  const bg = COR_POR_CATEGORIA[categoria];
  return `https://ui-avatars.com/api/?name=${param}&size=600&background=${bg}&color=ffffff&bold=true&length=2&format=png`;
}

const CELEBRIDADES = [
  // ============== Música (13) ==============
  { slug: "anitta", nome: "Anitta", categoria: "Música" },
  { slug: "caetano-veloso", nome: "Caetano Veloso", categoria: "Música" },
  { slug: "gilberto-gil", nome: "Gilberto Gil", categoria: "Música" },
  { slug: "ivete-sangalo", nome: "Ivete Sangalo", categoria: "Música" },
  { slug: "roberto-carlos", nome: "Roberto Carlos", categoria: "Música" },
  { slug: "pabllo-vittar", nome: "Pabllo Vittar", categoria: "Música" },
  { slug: "ludmilla", nome: "Ludmilla", categoria: "Música" },
  { slug: "sandy", nome: "Sandy", categoria: "Música" },
  { slug: "luisa-sonza", nome: "Luísa Sonza", categoria: "Música" },
  { slug: "jorge-ben-jor", nome: "Jorge Ben Jor", categoria: "Música" },
  { slug: "maria-bethania", nome: "Maria Bethânia", categoria: "Música" },
  { slug: "wesley-safadao", nome: "Wesley Safadão", categoria: "Música" },
  { slug: "gusttavo-lima", nome: "Gusttavo Lima", categoria: "Música" },

  // ============== Novela (13) ==============
  { slug: "fernanda-montenegro", nome: "Fernanda Montenegro", categoria: "Novela" },
  { slug: "gloria-pires", nome: "Glória Pires", categoria: "Novela" },
  { slug: "lazaro-ramos", nome: "Lázaro Ramos", categoria: "Novela" },
  { slug: "camila-pitanga", nome: "Camila Pitanga", categoria: "Novela" },
  { slug: "wagner-moura", nome: "Wagner Moura", categoria: "Novela" },
  { slug: "selton-mello", nome: "Selton Mello", categoria: "Novela" },
  { slug: "adriana-esteves", nome: "Adriana Esteves", categoria: "Novela" },
  { slug: "marina-ruy-barbosa", nome: "Marina Ruy Barbosa", categoria: "Novela" },
  { slug: "bruna-marquezine", nome: "Bruna Marquezine", categoria: "Novela" },
  { slug: "murilo-benicio", nome: "Murilo Benício", categoria: "Novela" },
  { slug: "caua-reymond", nome: "Cauã Reymond", categoria: "Novela" },
  { slug: "tony-ramos", nome: "Tony Ramos", categoria: "Novela" },
  { slug: "regina-case", nome: "Regina Casé", categoria: "Novela" },

  // ============== Esportes (12) ==============
  { slug: "neymar-jr", nome: "Neymar Jr.", categoria: "Esportes" },
  { slug: "vinicius-jr", nome: "Vinicius Jr.", categoria: "Esportes" },
  { slug: "marta", nome: "Marta", categoria: "Esportes" },
  { slug: "rebeca-andrade", nome: "Rebeca Andrade", categoria: "Esportes" },
  { slug: "bia-haddad-maia", nome: "Bia Haddad Maia", categoria: "Esportes" },
  { slug: "gabriel-jesus", nome: "Gabriel Jesus", categoria: "Esportes" },
  { slug: "casemiro", nome: "Casemiro", categoria: "Esportes" },
  { slug: "alisson-becker", nome: "Alisson Becker", categoria: "Esportes" },
  { slug: "ronaldo-fenomeno", nome: "Ronaldo Fenômeno", categoria: "Esportes" },
  { slug: "cafu", nome: "Cafu", categoria: "Esportes" },
  { slug: "bia-souza", nome: "Bia Souza", categoria: "Esportes" },
  { slug: "hugo-calderano", nome: "Hugo Calderano", categoria: "Esportes" },

  // ============== Influencers (12) ==============
  { slug: "whindersson-nunes", nome: "Whindersson Nunes", categoria: "Influencers" },
  { slug: "felipe-neto", nome: "Felipe Neto", categoria: "Influencers" },
  { slug: "virginia-fonseca", nome: "Virgínia Fonseca", categoria: "Influencers" },
  { slug: "camila-coutinho", nome: "Camila Coutinho", categoria: "Influencers" },
  { slug: "lucas-rangel", nome: "Lucas Rangel", categoria: "Influencers" },
  { slug: "gkay", nome: "GKay", categoria: "Influencers" },
  { slug: "bianca-andrade", nome: "Bianca Andrade", categoria: "Influencers" },
  { slug: "tata-werneck", nome: "Tata Werneck", categoria: "Influencers" },
  { slug: "maisa-silva", nome: "Maisa Silva", categoria: "Influencers" },
  { slug: "camila-loures", nome: "Camila Loures", categoria: "Influencers" },
  { slug: "carlinhos-maia", nome: "Carlinhos Maia", categoria: "Influencers" },
  { slug: "hugo-gloss", nome: "Hugo Gloss", categoria: "Influencers" },
];

// Templates genéricos por (categoria, seção) — 3 variantes cada.
// Todas escritas em tom claramente especulativo, sem alegações específicas
// sobre fatos verificáveis (datas, valores, parceiros, locais, processos).
const TEMPLATES = {
  "Música": {
    amorosa: [
      "Nas redes sociais, comenta-se que {NOME} mantém a vida amorosa bem reservada. Fãs costumam imaginar que a rotina pesada de turnês e gravações deixa pouco espaço pra encontros constantes, o que só alimenta o ar de mistério em torno do tema.\n\nNo imaginário do público, romances assumidos não fariam parte do estilo. Circulam rumores aqui e ali sobre paixões discretas — sempre sem confirmação, sempre no campo do diz-que-diz dos seguidores mais atentos.",
      "No mundo da música, diz a lenda entre fãs que {NOME} vive uma fase em que prioriza muito mais o trabalho do que aparições afetivas. Comenta-se nas redes que encontros, quando acontecem, ficam longe das câmeras e das colunas sociais.\n\nAlguns acreditam que existiria alguém especial nos bastidores; outros acham que é apenas o típico burburinho que cerca qualquer artista popular. No imaginário do público, o assunto continua sendo uma incógnita gostosa de especular.",
      "Comenta-se nas redes que {NOME} prefere manter o coração em modo privado. Fãs imaginam um perfil afetivo bem definido — gente do meio artístico, mas longe dos refletores — embora nada disso passe de teoria construída a partir de pequenos sinais em entrevistas.\n\nNo imaginário do público, romances midiáticos não combinam com o estilo. Por isso o tema vira terreno fértil pra fofoca: cada aparição vira pauta, cada silêncio vira indício.",
    ],
    patrimonio: [
      "Quando o assunto é patrimônio, fãs costumam imaginar que {NOME} administra com cuidado o que constrói na carreira musical. Diz a lenda nas redes que seria mais voltado(a) a investimentos discretos do que a ostentação visível.\n\nCirculam estimativas em portais de fofoca, mas todas no campo da especulação. No imaginário do público, a preferência seria por aplicar o que ganha em projetos próprios — sem alarde, sem números cravados pra ninguém checar.",
      "Comenta-se nas redes que {NOME} teria uma relação tranquila com o próprio sucesso financeiro. Fãs imaginam imóveis discretos, equipamentos de estúdio, projetos paralelos — tudo construído com calma ao longo dos anos de carreira.\n\nNo imaginário do público, ostentação não combina com o estilo. Diz a lenda entre seguidores que ele(a) seria daquelas pessoas que valoriza experiência mais que vitrine, o que faria o patrimônio crescer sem fazer barulho.",
      "Sobre o patrimônio de {NOME}, circulam versões variadas entre fãs e portais especializados — todas no campo da especulação. No imaginário do público, a carreira musical teria rendido o suficiente pra uma vida confortável, embora sem o brilho dos rankings de mais ricos.\n\nAlguns acreditam que ele(a) prefere reinvestir o que ganha em produção e equipe. Outros falam em pequenos negócios fora da música. Tudo no terreno do ouvi dizer, alimentando o burburinho típico das colunas.",
    ],
    curiosidades: [
      "{NOME} coleciona pequenas curiosidades que fãs adoram repetir. Comenta-se nas redes que tem rituais bem peculiares antes de gravações e shows — manias com horários, supersticiões com a equipe técnica, preferências bem específicas no camarim.\n\nNo imaginário do público, ele(a) também teria paixões fora dos palcos que poucos conhecem: gostos musicais escondidos, hobbies improváveis, leituras inesperadas. Tudo no campo do ouvi dizer, mas é exatamente isso que faz fãs gostarem de teorizar.",
      "Fãs adoram catalogar manias e curiosidades sobre {NOME}. Diz a lenda nas redes que tem rotinas bem específicas no processo criativo — só compõe em certos horários, anota ideias em cadernos físicos, evita o celular durante semanas de trabalho intenso.\n\nNo imaginário do público, existiriam também coleções e fascínios que ele(a) nunca explorou publicamente. Pequenos detalhes que circulam entre seguidores ajudam a construir o clima de mistério em torno da figura.",
      "Comenta-se que {NOME} é cheio(a) de pequenas particularidades que só os fãs mais atentos percebem. Sapatos sempre da mesma cor em entrevistas, gestos repetidos no palco, palavras-bordão que reaparecem — tudo vira matéria-prima pra teorias de seguidores.\n\nNo imaginário do público, ele(a) teria também passatempos discretos longe do ofício musical: cozinhar pra pessoas próximas, colecionar discos antigos, escrever fora da música. Detalhes pequenos, sempre no campo da especulação.",
    ],
    polemicas: [
      "Como acontece com qualquer figura do mundo da música, {NOME} vez ou outra vira centro de polêmicas — quase sempre por declarações curtas que viram print nas redes. Comenta-se que prefere não responder na hora, mas o burburinho costuma reaparecer.\n\nAlguns acreditam que tem opiniões firmes sobre o mercado fonográfico brasileiro, o que ocasionalmente gera atrito com colegas e críticos. Nada concreto, nada confirmado — apenas o ruído natural de quem está em evidência.",
      "Nas redes, {NOME} vira pauta de discussão sempre que solta uma frase mais incisiva em entrevistas ou postagens. Fãs e críticos costumam dividir interpretações, e o assunto rende debate por dias antes de esfriar.\n\nNo imaginário do público, ele(a) teria atritos discretos com outros nomes do meio, nunca explicitados em público. Diz a lenda entre seguidores que prefere resolver tudo nos bastidores, mas a internet sempre acha um indício pra alimentar a conversa.",
      "Polêmicas em torno de {NOME} costumam nascer de pequenos cortes fora de contexto. Uma resposta em entrevista, um like inesperado, um silêncio em momento delicado — tudo vira tema de coluna por uns dias. Comenta-se que ele(a) lida bem com isso e segue trabalhando.\n\nAlguns acreditam que haveria desafetos antigos no meio musical, mas tudo no campo do diz-que-diz. No imaginário do público, ele(a) prefere evitar briga pública e deixar o trabalho falar por si.",
    ],
  },
  "Novela": {
    amorosa: [
      "Nos bastidores das novelas, comenta-se que {NOME} separa bem a ficção da vida real — ainda que fãs costumem misturar as duas coisas. Romances de personagem viram especulação real, e a internet adora alimentar a confusão.\n\nNo imaginário do público, ele(a) estaria numa fase mais reservada quando o assunto é amor. Fãs imaginam encontros longe dos sets, talvez com alguém de fora do meio artístico, mas tudo isso passa de teoria construída a partir de pequenos sinais.",
      "Comenta-se nas redes que {NOME} prefere manter a vida amorosa fora do alcance das câmeras. Fãs imaginam uma rotina afetiva muito diferente do estereótipo de astro de TV, com encontros caseiros e círculo social bem fechado.\n\nNo imaginário do público, romances assumidos não combinariam com o estilo. Diz a lenda entre seguidores que existiria alguém especial bem longe dos holofotes, mas nada disso passa de teoria de fã atento aos detalhes.",
      "Diz a lenda entre fãs que {NOME} vive uma fase de descoberta afetiva, talvez com alguém que conheceu fora dos sets de gravação. Os mais românticos imaginam encontros discretos em cidades onde não grava — viagens curtas, sem registro.\n\nNo imaginário do público, ele(a) não tem pressa pra assumir nada publicamente. Comenta-se que evita expor relacionamentos para protegê-los do ritmo intenso das colunas e das redes sociais.",
    ],
    patrimonio: [
      "Sobre o patrimônio de {NOME}, circulam estimativas variadas entre fãs e portais de fofoca. Diz a lenda que a trajetória em novelas teria sido o suficiente pra garantir uma vida confortável, embora ele(a) evite ostentar nas redes.\n\nComenta-se que teria preferência por investir o que ganha em projetos pessoais — talvez uma produtora própria, talvez imóveis num lugar tranquilo. No imaginário do público, é o tipo de artista pé no chão, que valoriza estabilidade mais que aparência.",
      "Comenta-se nas redes que {NOME} construiu o próprio patrimônio com calma, sem alarde. Fãs imaginam uma vida confortável mas longe do exibicionismo, com investimentos em produção independente e projetos pessoais que pouco aparecem em entrevista.\n\nNo imaginário do público, é o tipo de artista que pensa no longo prazo. Diz a lenda entre seguidores que prefere reinvestir o que ganha em ideias criativas a comprar coisas pra mostrar nas redes sociais.",
      "Quando o assunto é dinheiro, circulam várias estimativas sobre {NOME} — todas no campo da especulação. No imaginário do público, sua carreira em novelas teria rendido o suficiente pra diversificar bem entre imóveis discretos e projetos artísticos próprios.\n\nAlguns acreditam que ele(a) seria sócio(a) de iniciativas culturais que poucos conhecem. Comenta-se também que valoriza muito a tranquilidade financeira, sem entrar em corrida por papéis grandes só por dinheiro.",
    ],
    curiosidades: [
      "Fãs adoram catalogar curiosidades sobre {NOME}. Comenta-se nas redes que tem manias antes de cada cena — repetir falas em voz alta no camarim, beber sempre o mesmo café, conversar com a equipe técnica antes de gravar.\n\nNo imaginário do público, seria também leitor(a) voraz nos intervalos das gravações, com fascínio por roteiros independentes. Detalhes que circulam entre fãs ajudam a montar o quebra-cabeça da figura, mesmo que nenhum deles seja confirmado oficialmente.",
      "Diz a lenda entre seguidores que {NOME} acumula manias bem peculiares no dia a dia das produções. Comenta-se que tem rituais antes de entrar em cena — uma música no fone, um exercício de respiração específico, conversa com determinada parte da equipe.\n\nNo imaginário do público, ele(a) também teria paixões fora das gravações que poucos conhecem. Alguns garantem que coleciona objetos específicos, outros falam em hobbies improváveis. Tudo no terreno do ouvi dizer entre fãs.",
      "{NOME} é cercado(a) de curiosidades que fãs adoram repetir. Comenta-se que tem preferências bem claras quanto a cenários, parceiros de cena, horários de gravação — pequenas exigências que se tornaram parte da rotina das produções em que aparece.\n\nNo imaginário do público, fora da TV existiria uma rotina simples: leituras inesperadas, gostos musicais discretos, viagens curtas pra cidades pequenas. Detalhes que ganham vida nos comentários de cada postagem.",
    ],
    polemicas: [
      "Como acontece com qualquer ator/atriz de destaque, {NOME} eventualmente vira assunto de polêmicas — quase sempre por interpretações de personagens que dividiram opiniões. Fãs e críticos costumam imaginar que acompanha de perto cada comentário, mesmo quando finge indiferença.\n\nAlguns acreditam que houve atritos discretos em produções antigas, com colegas ou direção. Nada que tenha vindo a público de fato, mas o burburinho de bastidor é alimento constante para colunas de fofoca.",
      "Comenta-se nas redes que {NOME} já viveu pequenos atritos nos bastidores de produções, sempre sem confirmação oficial. Fãs imaginam discussões pontuais sobre rumo de personagem, escolha de diretor, parceria de cena — tudo no campo da especulação.\n\nNo imaginário do público, ele(a) seria daqueles que evita responder publicamente quando vira tema de coluna. Diz a lenda entre seguidores que prefere deixar o trabalho falar mais alto que qualquer polêmica de momento.",
      "Polêmicas em torno de {NOME} costumam nascer de declarações curtas em entrevistas, sempre interpretadas de várias formas pela internet. Comenta-se que pega leve com os comentários, mas o assunto rende debate por dias antes de esfriar.\n\nAlguns acreditam que existiriam desafetos antigos no meio teledramatúrgico — colegas, autores, diretores. Tudo no campo do diz-que-diz. No imaginário do público, ele(a) lida com isso com a calma de quem já viu muito ciclo de fofoca passar.",
    ],
  },
  "Esportes": {
    amorosa: [
      "No universo dos esportes, comenta-se que {NOME} prefere manter a vida amorosa fora dos refletores. Fãs imaginam que rotina pesada de treinos e viagens torna difícil qualquer relacionamento muito visível, mas isso só aumenta a especulação.\n\nNo imaginário do público, seria do tipo família-primeiro — preferindo encontros caseiros a noitadas em eventos. Romances rumorados com nomes do meio surgem aqui e ali, mas o(a) atleta nunca confirma nem desmente publicamente.",
      "Comenta-se nas redes que {NOME} prioriza o foco esportivo acima de qualquer rotina afetiva muito intensa. Fãs imaginam uma vida bem dividida entre treino, descanso e poucos momentos de lazer com gente do círculo próximo.\n\nNo imaginário do público, romances assumidos não combinariam com a fase atual da carreira. Diz a lenda entre seguidores que existiria alguém especial fora do meio esportivo, mas tudo isso passa de especulação alimentada por sinais pequenos.",
      "Diz a lenda entre fãs que {NOME} vive uma fase em que prefere não dividir muito da vida pessoal nas redes. Comenta-se que rotina de competições e concentrações tornaria difícil qualquer relação muito exposta publicamente.\n\nNo imaginário do público, ele(a) teria preferência por encontros discretos, longe de eventos noturnos e tapete vermelho. Romances costumam ser tema de coluna a cada nova foto solta em viagem, mas nada disso costuma render confirmação.",
    ],
    patrimonio: [
      "Quando o assunto é o patrimônio de {NOME}, fãs e analistas circulam estimativas que vão de modestas a fantasiosas. Diz a lenda nas redes que teria investido bem o que conquistou na carreira esportiva, sempre orientado(a) por pessoas próximas e de confiança.\n\nComenta-se que teria preferência por investimentos conservadores e por projetos sociais ligados ao esporte em comunidades. No imaginário do público, é o tipo de atleta que pensa no pós-carreira desde cedo, sem gastar tudo no auge da fama.",
      "Comenta-se nas redes que {NOME} administra o próprio patrimônio com cabeça bem feita. Fãs imaginam investimentos em imóveis, projetos próprios, e um padrão de vida mais discreto do que outros nomes do esporte de mesmo porte.\n\nNo imaginário do público, ele(a) tem perfil de quem pensa no longo prazo. Diz a lenda entre seguidores que prefere reinvestir o que ganha em escolas de formação esportiva ou em pequenas empresas ligadas à própria modalidade.",
      "Sobre o patrimônio de {NOME}, circulam números de toda ordem na internet — quase sempre baseados em chutes de fãs e especulações de portais. No imaginário do público, ele(a) teria uma vida confortável mas sem ostentação, com gastos voltados a família e bem-estar.\n\nAlguns acreditam que mantém investimentos em projetos pouco explorados na mídia: marcas próprias, parcerias com clubes formadores, iniciativas filantrópicas. Tudo no terreno da especulação, mas é assim que o assunto vira manchete recorrente.",
    ],
    curiosidades: [
      "{NOME} acumula histórias curiosas que fãs adoram repetir. Comenta-se que tem rituais bem específicos antes de jogos ou competições — uma música no fone, um tipo certo de café da manhã, conversas com determinados colegas no vestiário.\n\nNo imaginário do público, também teria paixões fora do esporte que poucos conhecem. Alguns garantem que toca algum instrumento, outros falam em coleções específicas. Tudo no terreno do ouvi dizer, mas é justamente esse tipo de detalhe que faz fãs gostarem de teorizar.",
      "Diz a lenda entre seguidores que {NOME} é cheio(a) de pequenas manias de bastidor. Comenta-se que tem horários sagrados de descanso, supersticiões com números e equipamentos, preferências bem específicas no ambiente de concentração antes de competir.\n\nNo imaginário do público, fora do esporte existiriam hobbies improváveis — leituras inesperadas, gostos musicais escondidos, viagens curtas pra lugares que ninguém esperaria. Tudo no campo do diz-que-diz dos fãs mais atentos.",
      "Comenta-se nas redes que {NOME} guarda curiosidades que só o círculo próximo conhece. Fãs imaginam coleções discretas, hobbies bem distantes do esporte, gostos culinários específicos que aparecem em pequenos stories de viagens.\n\nNo imaginário do público, ele(a) seria uma pessoa de hábitos simples fora dos treinos. Diz a lenda entre seguidores que prefere noites tranquilas em casa a qualquer evento agitado da agenda esportiva.",
    ],
    polemicas: [
      "Como acontece com qualquer atleta de destaque, {NOME} vez ou outra vira centro de polêmicas — geralmente por declarações curtas em entrevistas pós-jogo que viram print nas redes. Comenta-se que já teria pequenos desafetos no vestiário, mas nada que tenha vazado oficialmente.\n\nAlguns acreditam que tem posicionamentos firmes sobre questões do esporte no Brasil, o que gera reação tanto de fãs quanto de críticos. Mas o(a) atleta costuma evitar entrar em qualquer briga pública e deixa a resposta pra dentro de campo.",
      "Comenta-se nas redes que {NOME} já passou por momentos delicados com torcida, imprensa e até com colegas — sempre por interpretações de gestos ou frases captadas fora de contexto. No imaginário do público, ele(a) lida com isso com mais paciência do que aparenta.\n\nAlguns acreditam que existem atritos antigos pouco comentados, escondidos nos bastidores de clubes ou seleções. Nada documentado, nada confirmado — apenas o burburinho típico que cerca quem está exposto ao olhar coletivo.",
      "Polêmicas em torno de {NOME} costumam surgir de pequenos gestos captados pelas câmeras — uma comemoração comentada, uma resposta ríspida, um like inesperado nas redes. Comenta-se que segue tocando a carreira sem se abalar com a repercussão.\n\nNo imaginário do público, haveria divergências discretas com técnicos, dirigentes ou jornalistas que cobrem o esporte. Diz a lenda entre seguidores que prefere resolver tudo dentro do ambiente do clube, longe do barulho da internet.",
    ],
  },
  "Influencers": {
    amorosa: [
      "No mundo das redes sociais, comenta-se que {NOME} vive uma fase em que prefere expor menos da vida amorosa do que já expôs no passado. Fãs costumam imaginar que aprendeu, na prática, que romances midiáticos pesam bastante na rotina online.\n\nNo imaginário do público, estaria conhecendo alguém de fora do meio digital — o que explicaria ausências em eventos noturnos. Ou talvez seja só uma fase de autoconhecimento, como ele(a) mesmo(a) sugere em vídeos enigmáticos pra alimentar a curiosidade dos seguidores.",
      "Comenta-se nas redes que {NOME} aprendeu a separar a vida amorosa do conteúdo público. Fãs imaginam encontros longe das câmeras, círculo social fechado, e um esforço consciente pra não transformar relacionamentos em pauta de vídeo curto.\n\nNo imaginário do público, ele(a) teria preferência por gente fora do meio digital — alguém com rotina mais reservada, menos exposta a comentários e prints. Romances atuais viram tema de coluna a cada story enigmático postado.",
      "Diz a lenda entre fãs que {NOME} está em fase de mais privacidade quando o assunto é coração. Comenta-se nas redes que cansou de transformar relacionamentos em conteúdo e prefere viver tudo longe dos olhares de seguidores e portais de fofoca.\n\nNo imaginário do público, existiria alguém especial bem afastado das câmeras, em rotina muito diferente da do conteúdo digital. Romances rumorados surgem em cada nova viagem postada, mas confirmações são raras quando vêm.",
    ],
    patrimonio: [
      "Sobre o patrimônio de {NOME}, circulam nas redes estimativas que vão do realista ao fantasioso. Diz a lenda entre fãs que a atuação como influenciador(a) teria rendido o suficiente pra diversificar bem os investimentos, principalmente em marcas próprias e iniciativas pessoais.\n\nComenta-se que seria sócio(a) de pequenos negócios fora do mundo digital — uma cafeteria, uma marca de roupas, projetos que divulga aos poucos. No imaginário do público, representa a nova geração de empresários digitais que pensam além do feed.",
      "Comenta-se nas redes que {NOME} converteu o sucesso digital em patrimônio diversificado. Fãs imaginam investimentos em marcas próprias, sociedades discretas em pequenos negócios, e um padrão de vida bem mais reservado do que o conteúdo publicado costuma sugerir.\n\nNo imaginário do público, é o tipo de criador(a) que pensa no longo prazo. Diz a lenda entre seguidores que reinveste boa parte do que ganha em equipe, equipamentos e projetos que ainda nem viraram público.",
      "Quando se fala em patrimônio de {NOME}, fãs costumam imaginar números altos sem qualquer base concreta. No imaginário do público, sua carreira nas redes teria rendido o suficiente pra investir em projetos paralelos — marcas, eventos, parcerias longas com empresas do mesmo nicho.\n\nAlguns acreditam que existem negócios fora do mundo digital que ele(a) mantém em segundo plano, sem alarde. Comenta-se também que prefere experiências discretas a compras espalhafatosas pra render conteúdo.",
    ],
    curiosidades: [
      "Fãs colecionam curiosidades sobre {NOME} com a mesma dedicação que ele(a) coleciona seguidores. Comenta-se nas redes que tem manias bem peculiares de gravação — só grava em determinados horários, com determinada iluminação, e refaz takes infinitas vezes até ficar satisfeito(a).\n\nNo imaginário do público, teria paixões discretas fora das redes: cozinhar pra amigos próximos, ler livros sobre comportamento, viajar sozinho(a) pelo Brasil. Pequenos detalhes que aparecem em stories rápidos e viram pauta de fofoca digital instantaneamente.",
      "Comenta-se nas redes que {NOME} tem manias de criação bem específicas. Diz a lenda entre fãs que segue rituais rigorosos antes de gravar — montar cenário, ajustar luz, repetir falas — tudo para entregar o que o público espera ver no feed.\n\nNo imaginário do público, fora das redes existiriam hobbies que poucos conhecem. Alguns garantem que pinta, outros falam em coleção de livros antigos. Tudo no terreno do diz-que-diz dos seguidores que prestam atenção em detalhes de bastidor.",
      "{NOME} acumula curiosidades que fãs adoram trocar nos comentários. Comenta-se que tem hábitos bem específicos de descanso, alimentação e relação com o celular — algo necessário pra quem produz tanto conteúdo sem queimar a saúde mental.\n\nNo imaginário do público, ele(a) teria fascínios fora do digital: cursos improváveis, gostos musicais escondidos, viagens curtas pra lugares pequenos. Tudo no campo do ouvi dizer, mas é assim que personagens digitais ganham densidade nas redes.",
    ],
    polemicas: [
      "Como acontece com qualquer influenciador(a) de grande alcance, {NOME} vez ou outra é centro de polêmicas nas redes — geralmente por opiniões emitidas em vídeos curtos que ganharam interpretações diferentes do que ele(a) pretendia inicialmente.\n\nComenta-se que já teria tido atritos discretos com outros nomes do mesmo nicho, sempre no terreno da indireta de story. Alguns acreditam que ignora propositalmente quem tenta provocar; outros acham que é mais participativo(a) nesses bate-papos do que aparenta na superfície.",
      "Polêmicas em torno de {NOME} costumam aparecer toda vez que solta uma frase mais provocativa em vídeo curto. Comenta-se nas redes que aprende rápido com cada repercussão e ajusta a comunicação pra próxima rodada, mesmo sem comentar publicamente.\n\nNo imaginário do público, existem rivalidades antigas com outras figuras do meio digital — disputas por marcas, por audiência, por palco em eventos. Diz a lenda entre fãs que essas tensões viram combustível pra novos conteúdos.",
      "Comenta-se nas redes que {NOME} já passou por crises de imagem causadas por declarações curtas e mal interpretadas. Fãs imaginam que aprendeu a lidar com isso ao longo dos anos, embora prefira não responder publicamente todas as vezes.\n\nNo imaginário do público, haveria desafetos antigos com colegas do mesmo segmento — sem confirmação. Alguns acreditam que mantém um time bem treinado pra apagar fogos no instante em que aparecem nas notificações.",
    ],
  },
};

const SECOES = ["amorosa", "patrimonio", "curiosidades", "polemicas"];

const data = CELEBRIDADES.map((celeb, i) => {
  const conteudos = {};
  for (const secao of SECOES) {
    const variantes = TEMPLATES[celeb.categoria][secao];
    const escolhido = variantes[i % variantes.length];
    conteudos[secao] = escolhido.replace(/\{NOME\}/g, celeb.nome);
  }
  return {
    slug: celeb.slug,
    nome: celeb.nome,
    categoria: celeb.categoria,
    fotoUrl: avatarUrl(celeb.nome, celeb.categoria),
    conteudos,
  };
});

const outPath = path.join(__dirname, "..", "src", "data", "famosos.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");
console.log(`Gerados ${data.length} famosos em ${outPath}`);
