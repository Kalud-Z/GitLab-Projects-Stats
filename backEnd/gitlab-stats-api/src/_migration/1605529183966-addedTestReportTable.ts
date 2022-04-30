import {MigrationInterface, QueryRunner} from "typeorm";

export class addedTestReportTable1605529183966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "test_report_entity" ("id" SERIAL NOT NULL, "error_count" integer NOT NULL, "failed_count" integer NOT NULL, "skipped_count" integer NOT NULL, "success_count" integer NOT NULL, "total_count" integer NOT NULL, "total_time" integer NOT NULL, "pipelineId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "test_report_entity" ADD CONSTRAINT "fk_396f3ce707c4318e15681c4fa3d" FOREIGN KEY ("pipelineId") REFERENCES "pipeline_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "test_report_entity" DROP CONSTRAINT "fk_396f3ce707c4318e15681c4fa3d"`);
        await queryRunner.query(`DROP TABLE "test_report_entity"`);
    }

}
