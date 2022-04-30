import {MigrationInterface, QueryRunner} from "typeorm";

export class true1605523703137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pipeline_entity" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "testColumn" boolean NOT NULL, "projectId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "project_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "testtt" boolean, "urlToRepo" character varying NOT NULL, "status" character varying NOT NULL, "groupId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "group_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "pipeline_entity" ADD CONSTRAINT "fk_edbce726f9329a3ee33f9d58f44" FOREIGN KEY ("projectId") REFERENCES "project_entity"("id")`);
        await queryRunner.query(`ALTER TABLE "project_entity" ADD CONSTRAINT "fk_1b493976ce2d11c6e369415bf00" FOREIGN KEY ("groupId") REFERENCES "group_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project_entity" DROP CONSTRAINT "fk_1b493976ce2d11c6e369415bf00"`);
        await queryRunner.query(`ALTER TABLE "pipeline_entity" DROP CONSTRAINT "fk_edbce726f9329a3ee33f9d58f44"`);
        await queryRunner.query(`DROP TABLE "group_entity"`);
        await queryRunner.query(`DROP TABLE "project_entity"`);
        await queryRunner.query(`DROP TABLE "pipeline_entity"`);
    }

}
