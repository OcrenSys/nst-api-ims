const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class secondMigration1686343699544 {
  name = 'secondMigration1686343699544';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`credit\` DROP FOREIGN KEY \`FK_d6871cc4881a37734edc3d77f4a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_905722f338fd55e74a3a01eb712\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_925aa26ea12c28a6adb614445ee\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d6871cc4881a37734edc3d77f4\` ON \`credit\``,
    );
    await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`order\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`variant\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`variant\` DROP COLUMN \`order\``);
    await queryRunner.query(
      `ALTER TABLE \`section\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`order\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`order\``);
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`order\``);
    await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`brand\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`comment\` varchar(255) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`webToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`member\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`member\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`member\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`status\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`position\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`position\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`position\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`position\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`position\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD \`removeAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD UNIQUE INDEX \`IDX_1419df244809aa35d63a91c642\` (\`orderId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1419df244809aa35d63a91c642\` ON \`credit\` (\`orderId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD CONSTRAINT \`FK_1419df244809aa35d63a91c642a\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f66dce68e327d1d1fdab81229fb\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_a3647bd11aed3cf968c9ce9b835\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_9593cc3b6ec5accb6a98bcfd14b\` FOREIGN KEY (\`variantId\`) REFERENCES \`variant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_9593cc3b6ec5accb6a98bcfd14b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_a3647bd11aed3cf968c9ce9b835\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f66dce68e327d1d1fdab81229fb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` DROP FOREIGN KEY \`FK_1419df244809aa35d63a91c642a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1419df244809aa35d63a91c642\` ON \`credit\``,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` DROP INDEX \`IDX_1419df244809aa35d63a91c642\``,
    );
    await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`position\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`removeAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`updateAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`createAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`position\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`position\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`removeAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`updateAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP COLUMN \`createAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`variant\` DROP COLUMN \`position\``);
    await queryRunner.query(`ALTER TABLE \`variant\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`variant\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`variant\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`position\``,
    );
    await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`removeAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`updateAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`createAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`webToken\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`comment\``);
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`credit\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`percent\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`percent\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`percent\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` DROP COLUMN \`removeAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` DROP COLUMN \`updateAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` DROP COLUMN \`createAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`createAt\``);
    await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`removeAt\``);
    await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`order\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`order\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`order\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`section\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`order\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variant\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`order\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`member\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`member\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`percent\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_date\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_d6871cc4881a37734edc3d77f4\` ON \`credit\` (\`orderId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_925aa26ea12c28a6adb614445ee\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_905722f338fd55e74a3a01eb712\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD CONSTRAINT \`FK_d6871cc4881a37734edc3d77f4a\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
};
