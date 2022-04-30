import {MigrationInterface, QueryRunner} from "typeorm";

export class true1605785053576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."pipeline_entity" DROP "testColumn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."pipeline_entity" ADD "testColumn" boolean NOT NULL`);
    }

}
