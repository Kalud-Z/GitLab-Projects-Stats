import {MigrationInterface, QueryRunner} from "typeorm";

export class testReportColumnsAreNowOfTypeDouble1605796156120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."test_report_entity" ALTER COLUMN "total_time" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."test_report_entity" ALTER COLUMN "total_time" TYPE double precision`);
    }

}
