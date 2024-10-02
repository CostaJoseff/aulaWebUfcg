-- CreateEnum
CREATE TYPE "StatusRelatorio" AS ENUM ('EM_EXECUCAO', 'CONCLUIDO', 'ERRO', 'USUARIO_DELETADO');

-- CreateEnum
CREATE TYPE "Direcao" AS ENUM ('CIMA_BAIXO', 'BAIXO_CIMA', 'DIREITA_ESQUERDA', 'ESQUERDA_DIREITA');

-- CreateTable
CREATE TABLE "AlterarEmailPendente" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "novoEmail" TEXT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlterarEmailPendente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "dataDeCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criacaoFinalizada" BOOLEAN NOT NULL DEFAULT false,
    "codigoVerificacao" TEXT,
    "token" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" SERIAL NOT NULL,
    "dataDeExecucao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "quadroDisplay" TEXT,
    "status" "StatusRelatorio" NOT NULL DEFAULT 'EM_EXECUCAO',
    "usuarioMatricula" TEXT NOT NULL,

    CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linha" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "coordenadas" DOUBLE PRECISION[],
    "direcao" "Direcao" NOT NULL,
    "cor" INTEGER[] DEFAULT ARRAY[255, 255, 255]::INTEGER[],
    "carros" INTEGER NOT NULL,
    "motos" INTEGER NOT NULL,
    "onibus" INTEGER NOT NULL,
    "caminhoes" INTEGER NOT NULL,
    "vans" INTEGER NOT NULL,
    "relatorioId" INTEGER NOT NULL,

    CONSTRAINT "Linha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlterarEmailPendente_novoEmail_key" ON "AlterarEmailPendente"("novoEmail");

-- CreateIndex
CREATE INDEX "AlterarEmailPendente_matricula_idx" ON "AlterarEmailPendente"("matricula");

-- CreateIndex
CREATE INDEX "AlterarEmailPendente_novoEmail_idx" ON "AlterarEmailPendente"("novoEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "Usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_cpf_idx" ON "Usuario"("cpf");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_matricula_idx" ON "Usuario"("matricula");

-- AddForeignKey
ALTER TABLE "Relatorio" ADD CONSTRAINT "Relatorio_usuarioMatricula_fkey" FOREIGN KEY ("usuarioMatricula") REFERENCES "Usuario"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linha" ADD CONSTRAINT "Linha_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
