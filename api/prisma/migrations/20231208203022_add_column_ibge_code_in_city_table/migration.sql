/*
  Warnings:

  - Added the required column `ibge_code` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `City` ADD COLUMN `ibge_code` VARCHAR(7) NOT NULL;
