// const { MigrationInterface, QueryRunner } = require('typeorm');

// module.exports = class firstMigration1671062456996 {
//   name = 'firstMigration1671062456996';

//   async up(queryRunner) {
//     await queryRunner.query(
//       `CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`date\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`creditId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`payment_date\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`amount\` int NOT NULL, \`date\` varchar(255) NOT NULL, \`creditId\` int NULL, \`paymentId\` int NULL, UNIQUE INDEX \`REL_db24887aaf7871047c1858c964\` (\`paymentId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`percent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`fee\` int NOT NULL, \`rate\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`credit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`fee\` int NOT NULL, \`rate\` int NOT NULL, \`isExonerated\` tinyint NOT NULL DEFAULT 0, \`percentId\` int NULL, \`orderId\` int NULL, UNIQUE INDEX \`REL_d6871cc4881a37734edc3d77f4\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`avatar\` varchar(255) NULL, \`userId\` int NULL, \`personId\` int NULL, UNIQUE INDEX \`REL_08897b166dee565859b7fb2fcc\` (\`userId\`), UNIQUE INDEX \`REL_32b5c701c2e416b6d60f294385\` (\`personId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`nickName\` varchar(255) NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`avatar\` varchar(255) NULL, \`order\` int NOT NULL DEFAULT '1', \`limit\` int NOT NULL DEFAULT '0', \`personId\` int NULL, UNIQUE INDEX \`REL_b48cc61c6aa50b58eb2522ee40\` (\`personId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`isAnulated\` tinyint NOT NULL, \`isCompleted\` tinyint NOT NULL, \`comment\` varchar(255) NULL, \`customerId\` int NULL, \`memberId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`variant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`code\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` int NOT NULL, \`priceCredit\` int NOT NULL, \`cost\` int NOT NULL, \`stock\` int NOT NULL, \`order\` int NOT NULL DEFAULT '0', \`isPublished\` tinyint NOT NULL DEFAULT 0, \`productId\` int NULL, UNIQUE INDEX \`IDX_d5ae5f80324192e95876cf478f\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`orders_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`price\` int NOT NULL, \`cost\` int NOT NULL, \`amount\` int NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, \`variantId\` int NULL, UNIQUE INDEX \`REL_36e10be44a8cb7c3fa65ff78cf\` (\`productId\`), UNIQUE INDEX \`REL_5b7337d32b9d6d29493abd9b9f\` (\`variantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`sub_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`order\` int NOT NULL DEFAULT '0', \`imageId\` int NULL, \`bannerId\` int NULL, \`categoryId\` int NULL, UNIQUE INDEX \`REL_7a4ff16fa3e081b0fb532ffa05\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`priceCredit\` int NOT NULL, \`cost\` int NOT NULL, \`description\` varchar(255) NULL, \`stock\` int NOT NULL, \`order\` int NOT NULL DEFAULT '0', \`isPublished\` tinyint NOT NULL DEFAULT 0, \`subCategoryId\` int NULL, \`brandId\` int NULL, \`sectionId\` int NULL, \`bannerId\` int NULL, UNIQUE INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`url\` varchar(255) NOT NULL, \`productId\` int NULL, \`variantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`order\` int NOT NULL DEFAULT '0', \`imageId\` int NULL, \`bannerId\` int NULL, UNIQUE INDEX \`REL_8a12e4cb68bc526f8d8e59efb1\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(), \`isActive\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`imageId\` int NULL, UNIQUE INDEX \`REL_6a6cc2453a0675d3e2cad3070c\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE \`user_roles_role\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_02e000f617842cc6a528181c5e7\` FOREIGN KEY (\`creditId\`) REFERENCES \`credit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment_date\` ADD CONSTRAINT \`FK_da43bfd255ac3f3c3aa82a23a84\` FOREIGN KEY (\`creditId\`) REFERENCES \`credit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment_date\` ADD CONSTRAINT \`FK_db24887aaf7871047c1858c9646\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`credit\` ADD CONSTRAINT \`FK_e8707b4becdee3009ad0c707ef3\` FOREIGN KEY (\`percentId\`) REFERENCES \`percent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`credit\` ADD CONSTRAINT \`FK_d6871cc4881a37734edc3d77f4a\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`member\` ADD CONSTRAINT \`FK_32b5c701c2e416b6d60f2943850\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_b48cc61c6aa50b58eb2522ee40a\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_925aa26ea12c28a6adb614445ee\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_905722f338fd55e74a3a01eb712\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`variant\` ADD CONSTRAINT \`FK_cb0df5c8d79ac0ea08a87119673\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` ADD CONSTRAINT \`FK_42ff679875387f6be995b729661\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` ADD CONSTRAINT \`FK_36e10be44a8cb7c3fa65ff78cfd\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` ADD CONSTRAINT \`FK_5b7337d32b9d6d29493abd9b9fc\` FOREIGN KEY (\`variantId\`) REFERENCES \`variant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_7a4ff16fa3e081b0fb532ffa055\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_02fc7553f53f300c35373052b81\` FOREIGN KEY (\`bannerId\`) REFERENCES \`banner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_51b8c0b349725210c4bd8b9b7a7\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_463d24f6d4905c488bd509164e6\` FOREIGN KEY (\`subCategoryId\`) REFERENCES \`sub_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9f43b335df2357a0b3149e6bb5c\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_5114dfc9fa3126a3af4d82d173a\` FOREIGN KEY (\`bannerId\`) REFERENCES \`banner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_c6eb61588205e25a848ba6105cd\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_5220fdcceb3fcf5b05c09d2bc73\` FOREIGN KEY (\`variantId\`) REFERENCES \`variant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_8a12e4cb68bc526f8d8e59efb12\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_b3dfc681a75c803d4e629277674\` FOREIGN KEY (\`bannerId\`) REFERENCES \`banner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`banner\` ADD CONSTRAINT \`FK_6a6cc2453a0675d3e2cad3070c0\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//   }

//   async down(queryRunner) {
//     await queryRunner.query(
//       `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`banner\` DROP FOREIGN KEY \`FK_6a6cc2453a0675d3e2cad3070c0\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_b3dfc681a75c803d4e629277674\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_8a12e4cb68bc526f8d8e59efb12\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_5220fdcceb3fcf5b05c09d2bc73\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_c6eb61588205e25a848ba6105cd\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_5114dfc9fa3126a3af4d82d173a\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9f43b335df2357a0b3149e6bb5c\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_463d24f6d4905c488bd509164e6\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_51b8c0b349725210c4bd8b9b7a7\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_02fc7553f53f300c35373052b81\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_7a4ff16fa3e081b0fb532ffa055\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` DROP FOREIGN KEY \`FK_5b7337d32b9d6d29493abd9b9fc\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` DROP FOREIGN KEY \`FK_36e10be44a8cb7c3fa65ff78cfd\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`orders_detail\` DROP FOREIGN KEY \`FK_42ff679875387f6be995b729661\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`variant\` DROP FOREIGN KEY \`FK_cb0df5c8d79ac0ea08a87119673\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_905722f338fd55e74a3a01eb712\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_925aa26ea12c28a6adb614445ee\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_b48cc61c6aa50b58eb2522ee40a\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`member\` DROP FOREIGN KEY \`FK_32b5c701c2e416b6d60f2943850\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`credit\` DROP FOREIGN KEY \`FK_d6871cc4881a37734edc3d77f4a\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`credit\` DROP FOREIGN KEY \`FK_e8707b4becdee3009ad0c707ef3\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment_date\` DROP FOREIGN KEY \`FK_db24887aaf7871047c1858c9646\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment_date\` DROP FOREIGN KEY \`FK_da43bfd255ac3f3c3aa82a23a84\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_02e000f617842cc6a528181c5e7\``,
//     );
//     await queryRunner.query(
//       `DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``,
//     );
//     await queryRunner.query(
//       `DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``,
//     );
//     await queryRunner.query(`DROP TABLE \`user_roles_role\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_6a6cc2453a0675d3e2cad3070c\` ON \`banner\``,
//     );
//     await queryRunner.query(`DROP TABLE \`banner\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_8a12e4cb68bc526f8d8e59efb1\` ON \`category\``,
//     );
//     await queryRunner.query(`DROP TABLE \`category\``);
//     await queryRunner.query(`DROP TABLE \`image\``);
//     await queryRunner.query(
//       `DROP INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` ON \`product\``,
//     );
//     await queryRunner.query(`DROP TABLE \`product\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_7a4ff16fa3e081b0fb532ffa05\` ON \`sub_category\``,
//     );
//     await queryRunner.query(`DROP TABLE \`sub_category\``);
//     await queryRunner.query(`DROP TABLE \`section\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_5b7337d32b9d6d29493abd9b9f\` ON \`orders_detail\``,
//     );
//     await queryRunner.query(
//       `DROP INDEX \`REL_36e10be44a8cb7c3fa65ff78cf\` ON \`orders_detail\``,
//     );
//     await queryRunner.query(`DROP TABLE \`orders_detail\``);
//     await queryRunner.query(
//       `DROP INDEX \`IDX_d5ae5f80324192e95876cf478f\` ON \`variant\``,
//     );
//     await queryRunner.query(`DROP TABLE \`variant\``);
//     await queryRunner.query(`DROP TABLE \`order\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_b48cc61c6aa50b58eb2522ee40\` ON \`customer\``,
//     );
//     await queryRunner.query(`DROP TABLE \`customer\``);
//     await queryRunner.query(`DROP TABLE \`person\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_32b5c701c2e416b6d60f294385\` ON \`member\``,
//     );
//     await queryRunner.query(
//       `DROP INDEX \`REL_08897b166dee565859b7fb2fcc\` ON \`member\``,
//     );
//     await queryRunner.query(`DROP TABLE \`member\``);
//     await queryRunner.query(`DROP TABLE \`user\``);
//     await queryRunner.query(`DROP TABLE \`role\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_d6871cc4881a37734edc3d77f4\` ON \`credit\``,
//     );
//     await queryRunner.query(`DROP TABLE \`credit\``);
//     await queryRunner.query(`DROP TABLE \`percent\``);
//     await queryRunner.query(
//       `DROP INDEX \`REL_db24887aaf7871047c1858c964\` ON \`payment_date\``,
//     );
//     await queryRunner.query(`DROP TABLE \`payment_date\``);
//     await queryRunner.query(`DROP TABLE \`payment\``);
//     await queryRunner.query(`DROP TABLE \`brand\``);
//   }
// };
