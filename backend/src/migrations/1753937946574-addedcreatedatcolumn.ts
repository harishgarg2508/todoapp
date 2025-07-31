import { MigrationInterface, QueryRunner } from "typeorm";

export class Addedcreatedatcolumn1753937946574 implements MigrationInterface {
    name = 'Addedcreatedatcolumn1753937946574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdAt"`);
    }

}
