-- DropForeignKey
ALTER TABLE `Farmer` DROP FOREIGN KEY `Farmer_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `Farmer` DROP FOREIGN KEY `Farmer_created_by_fkey`;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `Administrator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
