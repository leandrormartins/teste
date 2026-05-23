-- CreateTable
CREATE TABLE "Famoso" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Famoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conteudo" (
    "id" TEXT NOT NULL,
    "famosoId" TEXT NOT NULL,
    "secao" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "geradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Conteudo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Famoso_slug_key" ON "Famoso"("slug");

-- CreateIndex
CREATE INDEX "Conteudo_famosoId_idx" ON "Conteudo"("famosoId");

-- CreateIndex
CREATE UNIQUE INDEX "Conteudo_famosoId_secao_key" ON "Conteudo"("famosoId", "secao");

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_famosoId_fkey" FOREIGN KEY ("famosoId") REFERENCES "Famoso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
