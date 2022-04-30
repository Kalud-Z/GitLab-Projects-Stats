import {MigrationInterface, QueryRunner} from "typeorm";

export class pipelinesStatsColumnsAltered1605798874541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "testCoverage" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "testCoverage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration_inMinutes" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration_inMinutes" TYPE double precision`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "testCoverage" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "testCoverage" TYPE double precision`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" TYPE double precision`);
    }

}
