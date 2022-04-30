import {MigrationInterface, QueryRunner} from "typeorm";

export class projectsStatsEntityAltered1605809056782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_stats_entity" ALTER COLUMN "pipelinesSuccessRatio" TYPE double precision`);
    }

}
