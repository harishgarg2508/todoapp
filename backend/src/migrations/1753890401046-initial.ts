import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753890401046 implements MigrationInterface {
    name = 'Initial1753890401046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assigned_task" ("id" SERIAL NOT NULL, "taskId" integer, "userId" integer, CONSTRAINT "PK_09d9980f15d993a0beff7c92ad4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_683d1140bf462110686c80f33e1" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_5af6792f046edad23ec78db9326" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_5af6792f046edad23ec78db9326"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_683d1140bf462110686c80f33e1"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "assigned_task"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
