/*
  Warnings:

  - You are about to alter the column `precoServico` on the `Servico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Servico` MODIFY `precoServico` DOUBLE NULL;
