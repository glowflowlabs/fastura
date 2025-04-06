-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "duracao_minutos" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "works_usuario_id_idx" ON "works"("usuario_id");

-- CreateIndex
CREATE INDEX "works_data_fim_idx" ON "works"("data_fim");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
