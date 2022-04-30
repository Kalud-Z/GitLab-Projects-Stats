import {MigrationInterface, QueryRunner} from "typeorm";

export class true1605525446524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "group_stats_entity" ("id" SERIAL NOT NULL, "isThereSubgroups" boolean NOT NULL, "numberOfProjects" integer NOT NULL, "testCoverageOfAllProjects" integer NOT NULL, "numberOfPipelines" integer NOT NULL, "numberOfTestReports" integer NOT NULL, "groupId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "group_stats_entity" ADD CONSTRAINT "fk_54c84f7cd1f6f3fdebafc9ab731" FOREIGN KEY ("groupId") REFERENCES "group_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group_stats_entity" DROP CONSTRAINT "fk_54c84f7cd1f6f3fdebafc9ab731"`);
        await queryRunner.query(`DROP TABLE "group_stats_entity"`);
    }

}
