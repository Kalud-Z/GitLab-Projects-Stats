import {MigrationInterface, QueryRunner} from "typeorm";

export class groupStats_Altered1605878253798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_stats_entity" ALTER COLUMN "testCoverageOfAllProjects" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "public"."group_stats_entity" ALTER COLUMN "testCoverageOfAllProjects" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."group_stats_entity" ALTER COLUMN "testCoverageOfAllProjects" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."group_stats_entity" ALTER COLUMN "testCoverageOfAllProjects" TYPE double precision`);
    }

}
