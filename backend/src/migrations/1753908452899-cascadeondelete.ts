import { MigrationInterface, QueryRunner } from "typeorm";

export class Cascadeondelete1753908452899 implements MigrationInterface {
    name = 'Cascadeondelete1753908452899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_683d1140bf462110686c80f33e1"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_5af6792f046edad23ec78db9326"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_683d1140bf462110686c80f33e1" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_5af6792f046edad23ec78db9326" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_5af6792f046edad23ec78db9326"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_683d1140bf462110686c80f33e1"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_5af6792f046edad23ec78db9326" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_683d1140bf462110686c80f33e1" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
