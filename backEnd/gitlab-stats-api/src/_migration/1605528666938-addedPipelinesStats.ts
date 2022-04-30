import {MigrationInterface, QueryRunner} from "typeorm";

export class addedPipelinesStats1605528666938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pipeline_stats_entity" ("id" SERIAL NOT NULL, "isTestReportAvailable" boolean NOT NULL, "duration" integer NOT NULL, "duration_inMinutes" integer NOT NULL, "created_at" character varying NOT NULL, "created_at_rawDateFormat" TIMESTAMP NOT NULL, "testCoverage" integer NOT NULL, "pipelineId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "pipeline_stats_entity" ADD CONSTRAINT "fk_20facc0cb751f3f0b0a936817b4" FOREIGN KEY ("pipelineId") REFERENCES "pipeline_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pipeline_stats_entity" DROP CONSTRAINT "fk_20facc0cb751f3f0b0a936817b4"`);
        await queryRunner.query(`DROP TABLE "pipeline_stats_entity"`);
    }

}
