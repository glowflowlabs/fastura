/*
  Warnings:

  - Made the column `usuario_email` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "usuario_email" SET NOT NULL;
