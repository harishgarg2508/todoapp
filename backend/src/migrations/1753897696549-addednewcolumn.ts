import { MigrationInterface, QueryRunner } from "typeorm";

export class Addednewcolumn1753897696549 implements MigrationInterface {
    name = 'Addednewcolumn1753897696549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD "isCompleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP COLUMN "isCompleted"`);
    }

}
