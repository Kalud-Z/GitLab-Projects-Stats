import {MigrationInterface, QueryRunner} from "typeorm";

export class projectsStatsEntityAltered1605808856985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "averageDurationOfPipelines_inMinutes" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "testCoverage" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "averageDurationOfPipelines" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" TYPE double precision`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "averageDurationOfPipelines" TYPE double precision`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "testCoverage" TYPE double precision`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "averageDurationOfPipelines_inMinutes" TYPE double precision`);
    }

}
