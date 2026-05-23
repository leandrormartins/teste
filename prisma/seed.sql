-- Seed completo do FamaIA — cole este arquivo no SQL Editor do Neon.
-- Idempotente: pode rodar várias vezes sem duplicar.

-- ============================================================
-- 1. Famosos fictícios (5)
-- ============================================================
INSERT INTO "Famoso" ("id", "slug", "nome", "categoria", "fotoUrl") VALUES
  ('seed_adriana', 'adriana-cordeiro', 'Adriana Cordeiro', 'Música',      'https://picsum.photos/seed/adriana-cordeiro/600/800'),
  ('seed_lucas',   'lucas-vianna',     'Lucas Vianna',     'Novela',      'https://picsum.photos/seed/lucas-vianna/600/800'),
  ('seed_bruno',   'bruno-falcao',     'Bruno Falcão',     'Esportes',    'https://picsum.photos/seed/bruno-falcao/600/800'),
  ('seed_carol',   'carolina-reis',    'Carolina Reis',    'Influencers', 'https://picsum.photos/seed/carolina-reis/600/800'),
  ('seed_pedro',   'pedro-almada',     'Pedro Almada',     'Música',      'https://picsum.photos/seed/pedro-almada/600/800')
ON CONFLICT ("slug") DO NOTHING;

-- ============================================================
-- 2. Conteúdo pré-gerado (20 = 5 famosos × 4 seções)
-- Textos especulativos, escritos no estilo revista de fofoca,
-- sem citar fatos verificáveis. Conteúdo fictício para entretenimento.
-- ============================================================
INSERT INTO "Conteudo" ("id", "famosoId", "secao", "texto") VALUES

-- Adriana Cordeiro
('cont_adriana_amorosa', 'seed_adriana', 'amorosa',
'Nas redes sociais, fãs costumam imaginar que Adriana Cordeiro vive uma fase bem reservada no amor. Comenta-se que sua agenda de turnês deixa pouco espaço pra encontros constantes, o que alimenta o ar de mistério em torno de quem ocuparia o coração da cantora.

No imaginário do público, há quem aposte que Adriana tem preferência por gente do próprio meio artístico, mas longe dos holofotes. Romances assumidos não são da praia dela, dizem os mais atentos aos sinais discretos que ela deixa em entrevistas.'),

('cont_adriana_patrimonio', 'seed_adriana', 'patrimonio',
'Quando o assunto é patrimônio, circulam várias estimativas sobre Adriana Cordeiro — todas no campo da especulação. Diz a lenda entre fãs que sua carreira na música teria rendido o suficiente pra investir em imóveis discretos, embora ninguém arrisque cravar valores.

Comenta-se também que Adriana mantém hábitos relativamente simples para alguém da sua estatura. No imaginário do público, isso faria seu patrimônio crescer de forma constante, sem ostentação que chame atenção.'),

('cont_adriana_curiosidades', 'seed_adriana', 'curiosidades',
'Adriana Cordeiro é cercada de pequenas curiosidades que fãs adoram repetir. Comenta-se que ela tem rituais bem peculiares de bastidores antes de subir ao palco — entre superstições com horários e manias com a equipe técnica.

No imaginário do público, há também histórias de que Adriana seria fascinada por culinária regional brasileira durante as turnês, sempre tentando descobrir um sabor novo em cada cidade. São detalhes que circulam entre fãs e ajudam a construir o clima em torno da artista.'),

('cont_adriana_polemicas', 'seed_adriana', 'polemicas',
'Como toda figura do mundo da música, Adriana vez ou outra é alvo de comentários acalorados nas redes. Recentemente, fãs costumam imaginar pequenas trocas de farpas com colegas do meio — sempre sem provas, sempre no campo do diz-que-diz.

Alguns acreditam que Adriana tenha opiniões firmes sobre o mercado fonográfico brasileiro, o que ocasionalmente vira debate nos comentários. Mas nada concreto, nada confirmado — apenas o burburinho natural de quem está em evidência.'),

-- Lucas Vianna
('cont_lucas_amorosa', 'seed_lucas', 'amorosa',
'Nos bastidores das novelas, comenta-se que Lucas Vianna seria daqueles atores que separam bem a ficção da vida real — ainda que fãs costumem misturar as duas coisas. Romances de personagem são sempre confundidos com possíveis romances reais, e a internet adora especular.

No imaginário do público, Lucas estaria numa fase de descoberta afetiva, talvez com alguém que conheceu fora dos sets de gravação. Os mais românticos imaginam encontros discretos longe da cidade onde grava, mas nada disso passa de teoria de fã.'),

('cont_lucas_patrimonio', 'seed_lucas', 'patrimonio',
'Sobre o patrimônio de Lucas Vianna, circulam estimativas variadas entre fãs e portais de fofoca. Diz a lenda que sua trajetória em novelas teria sido o suficiente pra garantir uma vida confortável, embora ele evite ostentar nas redes.

Comenta-se que Lucas teria preferência por investir o que ganha em projetos pessoais — talvez uma produtora própria, talvez imóveis num lugar tranquilo. No imaginário do público, ele seria o tipo de ator pé no chão, que valoriza estabilidade mais que aparência.'),

('cont_lucas_curiosidades', 'seed_lucas', 'curiosidades',
'Fãs adoram catalogar curiosidades sobre Lucas Vianna. Comenta-se nas redes que ele teria manias antes de cada cena — repetir falas em voz alta no camarim, beber sempre o mesmo café, conversar com a equipe técnica antes de gravar.

No imaginário do público, Lucas seria também um leitor voraz nos intervalos das gravações, e teria fascínio por roteiros independentes. Detalhes que circulam entre fãs ajudam a montar o quebra-cabeça do ator, mesmo que nenhum deles seja confirmado.'),

('cont_lucas_polemicas', 'seed_lucas', 'polemicas',
'Como acontece com qualquer ator de novela, Lucas Vianna eventualmente vira assunto de polêmicas nas redes — quase sempre por interpretações de personagens que dividiram opiniões. Fãs e críticos costumam imaginar que ele acompanha de perto cada comentário, mesmo quando finge indiferença.

Alguns acreditam que houve atritos discretos em produções antigas, com colegas ou direção. Nada que tenha vindo a público de fato, mas o burburinho de bastidor é alimento constante para colunas de fofoca.'),

-- Bruno Falcão
('cont_bruno_amorosa', 'seed_bruno', 'amorosa',
'No universo dos esportes, comenta-se nas redes que Bruno Falcão prefere manter a vida amorosa fora dos refletores. Fãs costumam imaginar que sua rotina de treinos e viagens tornaria difícil qualquer relacionamento de longo prazo, mas isso só aumenta a especulação sobre quem estaria ao lado dele.

No imaginário do público, Bruno seria do tipo família-primeiro — preferindo encontros caseiros a noitadas. Romances rumorados com nomes do meio surgem aqui e ali, mas o atleta nunca confirma nem desmente.'),

('cont_bruno_patrimonio', 'seed_bruno', 'patrimonio',
'Quando o assunto é o patrimônio de Bruno Falcão, fãs e analistas circulam estimativas que vão de modestas a fantasiosas. Diz a lenda nas redes que ele teria investido bem o que conquistou na carreira esportiva, sempre orientado por gente da família.

Comenta-se que Bruno teria preferência por investimentos conservadores e projetos sociais ligados a esportes em comunidades. No imaginário do público, ele seria o tipo de atleta que pensa no pós-carreira desde cedo, sem gastar tudo no auge.'),

('cont_bruno_curiosidades', 'seed_bruno', 'curiosidades',
'Bruno Falcão acumula histórias curiosas que fãs adoram repetir. Comenta-se que ele tem rituais bem específicos antes dos jogos — uma música no fone, um tipo certo de café da manhã, conversas com determinados colegas.

No imaginário do público, Bruno também teria paixões fora do esporte que poucos conhecem: alguns garantem que ele toca um instrumento musical, outros acreditam que coleciona algum tipo de memorabilia esportiva. Tudo no terreno do ouvi dizer.'),

('cont_bruno_polemicas', 'seed_bruno', 'polemicas',
'Como acontece com qualquer atleta de destaque, Bruno Falcão vez ou outra vira centro de polêmicas — geralmente por declarações curtas em entrevistas pós-jogo que viram print nas redes. Comenta-se que ele já teria desafetos no vestiário, mas nada vazou oficialmente.

Alguns acreditam que Bruno tem posicionamentos firmes sobre questões do esporte no Brasil, o que gera reação tanto de fãs quanto de críticos. Mas o atleta costuma evitar entrar em qualquer briga pública.'),

-- Carolina Reis
('cont_carol_amorosa', 'seed_carol', 'amorosa',
'No mundo das redes sociais, comenta-se que Carolina Reis vive uma fase em que prefere expor menos da vida amorosa do que já expôs no passado. Fãs costumam imaginar que ela aprendeu, na prática, que romances midiáticos pesam bastante.

No imaginário do público, Carolina estaria conhecendo alguém de fora do meio digital — o que explicaria sua ausência cada vez maior em eventos noturnos. Ou talvez seja só uma fase de autoconhecimento, como ela mesma sugere em vídeos enigmáticos.'),

('cont_carol_patrimonio', 'seed_carol', 'patrimonio',
'Sobre o patrimônio de Carolina Reis, circulam nas redes estimativas que vão do realista ao fantasioso. Diz a lenda entre fãs que sua atuação como influenciadora teria rendido o suficiente pra diversificar bem os investimentos, principalmente em marcas próprias.

Comenta-se que Carolina seria sócia de pequenos negócios fora do mundo digital — uma cafeteria, uma marca de roupas, projetos que ela divulga aos poucos. No imaginário do público, ela representa a nova geração de empresárias digitais que pensam além do feed.'),

('cont_carol_curiosidades', 'seed_carol', 'curiosidades',
'Fãs colecionam curiosidades sobre Carolina Reis com a mesma dedicação que ela própria coleciona seguidores. Comenta-se que tem manias bem peculiares de gravação — só grava conteúdo em determinados horários, com determinada iluminação, e refaz takes infinitas vezes.

No imaginário do público, Carolina teria também paixões discretas fora das redes: cozinhar para amigos próximos, ler livros sobre comportamento, viajar sozinha pelo Brasil. Pequenos detalhes que aparecem em stories rápidos e viram pauta de fofoca digital.'),

('cont_carol_polemicas', 'seed_carol', 'polemicas',
'Como acontece com qualquer influenciadora de grande alcance, Carolina Reis vez ou outra é centro de polêmicas nas redes — geralmente por opiniões emitidas em vídeos curtos que ganharam interpretações diferentes do que ela pretendia.

Comenta-se que ela já teria tido atritos discretos com outras influenciadoras do mesmo nicho, sempre no terreno da indireta de story. Alguns acreditam que Carolina ignora propositalmente quem tenta provocar; outros acham que ela é mais participativa nesses bate-papos do que aparenta.'),

-- Pedro Almada
('cont_pedro_amorosa', 'seed_pedro', 'amorosa',
'No universo da música, comenta-se que Pedro Almada prefere manter o coração em modo privado. Fãs costumam imaginar que sua personalidade introspectiva torna as relações dele bem diferentes do estereótipo do músico boêmio que tanto se vê.

No imaginário do público, Pedro estaria vivendo uma fase em que valoriza muito mais conversas longas do que aparições conjuntas em eventos. Romances rumorados surgem aqui e ali, mas o cantor não alimenta nem desmente — e isso só aumenta o burburinho.'),

('cont_pedro_patrimonio', 'seed_pedro', 'patrimonio',
'Quando se fala em patrimônio de Pedro Almada, fãs costumam imaginar números modestos comparados a outros nomes da música — mas garantem que ele administra bem o que ganha. Diz a lenda entre seguidores que Pedro investe em equipamentos de estúdio próprios em vez de luxo pessoal.

Comenta-se também que ele teria uma casa simples num lugar afastado, onde compõe a maior parte do material. No imaginário do público, Pedro seria a personificação do artista que prioriza o trabalho e a tranquilidade acima de qualquer ostentação.'),

('cont_pedro_curiosidades', 'seed_pedro', 'curiosidades',
'Pedro Almada é cercado de pequenas curiosidades que fãs adoram debater nas redes. Comenta-se que ele tem manias específicas no processo criativo — só compõe depois da meia-noite, anota ideias em cadernos físicos, evita celular durante semanas inteiras.

No imaginário do público, Pedro também seria fascinado por gêneros musicais que ele nunca explorou publicamente, e teria paixão por discos antigos colecionados ao longo dos anos. Tudo no campo do alguém disse que viu, mas é justamente isso que faz fãs gostarem tanto de teorizar sobre ele.'),

('cont_pedro_polemicas', 'seed_pedro', 'polemicas',
'Como qualquer artista da música, Pedro Almada vez ou outra acaba envolvido em polêmicas — quase sempre por declarações que viram recorte fora de contexto. Comenta-se nas redes que ele teria opiniões fortes sobre o mercado da música no Brasil, o que ocasionalmente gera atrito com colegas e críticos.

Alguns acreditam que Pedro já tenha recusado parcerias importantes por questões artísticas, o que rendeu cochichos nos bastidores. Nada comprovado, mas o burburinho costuma reaparecer toda vez que ele lança algo novo.')

ON CONFLICT ("famosoId", "secao") DO NOTHING;
