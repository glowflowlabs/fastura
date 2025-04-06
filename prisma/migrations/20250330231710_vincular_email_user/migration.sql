/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `works` table. All the data in the column will be lost.
  - Added the required column `usuario_email` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_usuario_id_fkey";

-- DropIndex
DROP INDEX "works_usuario_id_idx";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_email" TEXT;

-- AlterTable
ALTER TABLE "works" DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_email" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "works_usuario_email_idx" ON "works"("usuario_email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_usuario_email_fkey" FOREIGN KEY ("usuario_email") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_usuario_email_fkey" FOREIGN KEY ("usuario_email") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
