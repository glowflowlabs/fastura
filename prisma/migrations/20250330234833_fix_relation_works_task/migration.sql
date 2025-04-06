-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_usuario_email_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_usuario_email_fkey";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_usuario_email_fkey" FOREIGN KEY ("usuario_email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_usuario_email_fkey" FOREIGN KEY ("usuario_email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
