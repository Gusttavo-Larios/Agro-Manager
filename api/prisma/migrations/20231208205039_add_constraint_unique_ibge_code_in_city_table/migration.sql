/*
  Warnings:

  - A unique constraint covering the columns `[ibge_code]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `City_ibge_code_key` ON `City`(`ibge_code`);
