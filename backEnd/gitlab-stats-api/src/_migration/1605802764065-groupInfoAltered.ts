import {MigrationInterface, QueryRunner} from "typeorm";

export class groupInfoAltered1605802764065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_info_entity" ADD "gitlabId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_info_entity" DROP "gitlabId"`);
    }

}
