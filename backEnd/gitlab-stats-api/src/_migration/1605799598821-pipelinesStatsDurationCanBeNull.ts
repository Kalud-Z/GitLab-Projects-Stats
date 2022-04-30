import {MigrationInterface, QueryRunner} from "typeorm";

export class pipelinesStatsDurationCanBeNull1605799598821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."pipeline_stats_entity" ALTER COLUMN "duration" TYPE double precision`);
    }

}
