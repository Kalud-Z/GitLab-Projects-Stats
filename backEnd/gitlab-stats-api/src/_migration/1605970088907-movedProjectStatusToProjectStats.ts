import {MigrationInterface, QueryRunner} from "typeorm";

export class movedProjectStatusToProjectStats1605970088907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_entity" DROP "status"`);
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" ADD "status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_stats_entity" DROP "status"`);
        await queryRunner.query(`ALTER TABLE "public"."project_entity" ADD "status" character varying`);
    }

}
