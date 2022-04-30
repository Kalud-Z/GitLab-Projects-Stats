import {MigrationInterface, QueryRunner} from "typeorm";

export class addedProjectStatsTable1605527223984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "project_stats_entity" ("id" SERIAL NOT NULL, "numberOfPipelines" integer NOT NULL, "areTestsAvailable" boolean NOT NULL, "numberOfTestReports" integer NOT NULL, "averageDurationOfPipelines" integer NOT NULL, "averageDurationOfPipelines_inMinutes" integer NOT NULL, "testCoverage" integer NOT NULL, "numberOfSuccessfulPipelines" integer NOT NULL, "numberOfFailedPipelines" integer NOT NULL, "numberOfCanceledPipelines" integer NOT NULL, "numberOfRunningPipelines" integer NOT NULL, "numberOfSkippedPipelines" integer NOT NULL, "pipelinesSuccessRatio" integer NOT NULL, "projectId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "project_stats_entity" ADD CONSTRAINT "fk_3ade40f3a2eb170d1fd3624aaf8" FOREIGN KEY ("projectId") REFERENCES "project_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project_stats_entity" DROP CONSTRAINT "fk_3ade40f3a2eb170d1fd3624aaf8"`);
        await queryRunner.query(`DROP TABLE "project_stats_entity"`);
    }

}
