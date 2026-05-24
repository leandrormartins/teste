-- FamaIA — seed com 50 celebridades brasileiras reais.
-- Cole este arquivo no SQL Editor do Neon e execute.
--
-- ATENÇÃO: este script APAGA todos os famosos e conteúdos existentes
-- antes de inserir os novos (TRUNCATE com CASCADE). Comente a linha abaixo
-- se quiser preservar o que já está no banco.
--
-- As fotos usam ui-avatars.com como placeholder (geradas a partir das
-- iniciais, com cor por categoria). Para usar fotos reais do Wikimedia,
-- substitua o campo fotoUrl pela URL direta do arquivo, ex:
--   https://upload.wikimedia.org/wikipedia/commons/thumb/.../600px-arquivo.jpg
-- O host `upload.wikimedia.org` já está liberado em next.config.mjs.

TRUNCATE "Conteudo", "Famoso" RESTART IDENTITY CASCADE;

INSERT INTO "Famoso" ("id", "slug", "nome", "categoria", "fotoUrl") VALUES

-- ============================================================
-- MÚSICA (13)
-- ============================================================
('cel_anitta',         'anitta',         'Anitta',         'Música', 'https://ui-avatars.com/api/?name=Anitta&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_caetano',        'caetano-veloso', 'Caetano Veloso', 'Música', 'https://ui-avatars.com/api/?name=Caetano+Veloso&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_gilberto',       'gilberto-gil',   'Gilberto Gil',   'Música', 'https://ui-avatars.com/api/?name=Gilberto+Gil&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_ivete',          'ivete-sangalo',  'Ivete Sangalo',  'Música', 'https://ui-avatars.com/api/?name=Ivete+Sangalo&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_roberto',        'roberto-carlos', 'Roberto Carlos', 'Música', 'https://ui-avatars.com/api/?name=Roberto+Carlos&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_pabllo',         'pabllo-vittar',  'Pabllo Vittar',  'Música', 'https://ui-avatars.com/api/?name=Pabllo+Vittar&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_ludmilla',       'ludmilla',       'Ludmilla',       'Música', 'https://ui-avatars.com/api/?name=Ludmilla&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_sandy',          'sandy',          'Sandy',          'Música', 'https://ui-avatars.com/api/?name=Sandy&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_luisa',          'luisa-sonza',    'Luísa Sonza',    'Música', 'https://ui-avatars.com/api/?name=Luisa+Sonza&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_jorgeben',       'jorge-ben-jor',  'Jorge Ben Jor',  'Música', 'https://ui-avatars.com/api/?name=Jorge+Ben&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_bethania',       'maria-bethania', 'Maria Bethânia', 'Música', 'https://ui-avatars.com/api/?name=Maria+Bethania&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_wesley',         'wesley-safadao', 'Wesley Safadão', 'Música', 'https://ui-avatars.com/api/?name=Wesley+Safadao&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),
('cel_gusttavo',       'gusttavo-lima',  'Gusttavo Lima',  'Música', 'https://ui-avatars.com/api/?name=Gusttavo+Lima&size=600&background=e0457b&color=ffffff&bold=true&length=2&format=png'),

-- ============================================================
-- NOVELA (13)
-- ============================================================
('cel_fernanda_m',     'fernanda-montenegro',  'Fernanda Montenegro',  'Novela', 'https://ui-avatars.com/api/?name=Fernanda+Montenegro&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_gloria_p',       'gloria-pires',         'Glória Pires',         'Novela', 'https://ui-avatars.com/api/?name=Gloria+Pires&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_lazaro',         'lazaro-ramos',         'Lázaro Ramos',         'Novela', 'https://ui-avatars.com/api/?name=Lazaro+Ramos&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_pitanga',        'camila-pitanga',       'Camila Pitanga',       'Novela', 'https://ui-avatars.com/api/?name=Camila+Pitanga&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_wagner',         'wagner-moura',         'Wagner Moura',         'Novela', 'https://ui-avatars.com/api/?name=Wagner+Moura&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_selton',         'selton-mello',         'Selton Mello',         'Novela', 'https://ui-avatars.com/api/?name=Selton+Mello&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_adriana_e',      'adriana-esteves',      'Adriana Esteves',      'Novela', 'https://ui-avatars.com/api/?name=Adriana+Esteves&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_marina_rb',      'marina-ruy-barbosa',   'Marina Ruy Barbosa',   'Novela', 'https://ui-avatars.com/api/?name=Marina+Ruy+Barbosa&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_bruna_m',        'bruna-marquezine',     'Bruna Marquezine',     'Novela', 'https://ui-avatars.com/api/?name=Bruna+Marquezine&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_murilo_b',       'murilo-benicio',       'Murilo Benício',       'Novela', 'https://ui-avatars.com/api/?name=Murilo+Benicio&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_caua',           'caua-reymond',         'Cauã Reymond',         'Novela', 'https://ui-avatars.com/api/?name=Caua+Reymond&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_tony_r',         'tony-ramos',           'Tony Ramos',           'Novela', 'https://ui-avatars.com/api/?name=Tony+Ramos&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),
('cel_regina_c',       'regina-case',          'Regina Casé',          'Novela', 'https://ui-avatars.com/api/?name=Regina+Case&size=600&background=7c3aed&color=ffffff&bold=true&length=2&format=png'),

-- ============================================================
-- ESPORTES (12)
-- ============================================================
('cel_neymar',         'neymar-jr',         'Neymar Jr.',         'Esportes', 'https://ui-avatars.com/api/?name=Neymar+Jr&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_vinijr',         'vinicius-jr',       'Vinicius Jr.',       'Esportes', 'https://ui-avatars.com/api/?name=Vinicius+Jr&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_marta',          'marta',             'Marta',              'Esportes', 'https://ui-avatars.com/api/?name=Marta&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_rebeca_a',       'rebeca-andrade',    'Rebeca Andrade',     'Esportes', 'https://ui-avatars.com/api/?name=Rebeca+Andrade&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_bia_h',          'bia-haddad-maia',   'Bia Haddad Maia',    'Esportes', 'https://ui-avatars.com/api/?name=Bia+Haddad+Maia&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_gabrieljesus',   'gabriel-jesus',     'Gabriel Jesus',      'Esportes', 'https://ui-avatars.com/api/?name=Gabriel+Jesus&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_casemiro',       'casemiro',          'Casemiro',           'Esportes', 'https://ui-avatars.com/api/?name=Casemiro&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_alisson',        'alisson-becker',    'Alisson Becker',     'Esportes', 'https://ui-avatars.com/api/?name=Alisson+Becker&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_ronaldo_fen',    'ronaldo-fenomeno',  'Ronaldo Fenômeno',   'Esportes', 'https://ui-avatars.com/api/?name=Ronaldo+Fenomeno&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_cafu',           'cafu',              'Cafu',               'Esportes', 'https://ui-avatars.com/api/?name=Cafu&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_bia_s',          'bia-souza',         'Bia Souza',          'Esportes', 'https://ui-avatars.com/api/?name=Bia+Souza&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),
('cel_calderano',      'hugo-calderano',    'Hugo Calderano',     'Esportes', 'https://ui-avatars.com/api/?name=Hugo+Calderano&size=600&background=059669&color=ffffff&bold=true&length=2&format=png'),

-- ============================================================
-- INFLUENCERS (12)
-- ============================================================
('cel_whindersson',    'whindersson-nunes', 'Whindersson Nunes',  'Influencers', 'https://ui-avatars.com/api/?name=Whindersson+Nunes&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_felipeneto',     'felipe-neto',       'Felipe Neto',        'Influencers', 'https://ui-avatars.com/api/?name=Felipe+Neto&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_virginia',       'virginia-fonseca',  'Virgínia Fonseca',   'Influencers', 'https://ui-avatars.com/api/?name=Virginia+Fonseca&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_camilac',        'camila-coutinho',   'Camila Coutinho',    'Influencers', 'https://ui-avatars.com/api/?name=Camila+Coutinho&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_lucasrangel',    'lucas-rangel',      'Lucas Rangel',       'Influencers', 'https://ui-avatars.com/api/?name=Lucas+Rangel&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_gkay',           'gkay',              'GKay',               'Influencers', 'https://ui-avatars.com/api/?name=GKay&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_bianca_a',       'bianca-andrade',    'Bianca Andrade',     'Influencers', 'https://ui-avatars.com/api/?name=Bianca+Andrade&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_tata',           'tata-werneck',      'Tata Werneck',       'Influencers', 'https://ui-avatars.com/api/?name=Tata+Werneck&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_maisa',          'maisa-silva',       'Maisa Silva',        'Influencers', 'https://ui-avatars.com/api/?name=Maisa+Silva&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_camilaloures',   'camila-loures',     'Camila Loures',      'Influencers', 'https://ui-avatars.com/api/?name=Camila+Loures&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_carlinhosmaia',  'carlinhos-maia',    'Carlinhos Maia',     'Influencers', 'https://ui-avatars.com/api/?name=Carlinhos+Maia&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png'),
('cel_hugogloss',      'hugo-gloss',        'Hugo Gloss',         'Influencers', 'https://ui-avatars.com/api/?name=Hugo+Gloss&size=600&background=f97316&color=ffffff&bold=true&length=2&format=png');
