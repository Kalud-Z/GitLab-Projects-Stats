import {MigrationInterface, QueryRunner} from "typeorm";

export class addedColumnToProjectStats1606329519301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ADD "areTestCoveragesAvailable" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" DROP "areTestCoveragesAvailable"`);
    }

}
