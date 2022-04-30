import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeDelete1608318305596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_entity" ADD "tempData" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_entity" DROP "tempData"`);
    }

}
