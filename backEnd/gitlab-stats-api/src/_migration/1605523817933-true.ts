import {MigrationInterface, QueryRunner} from "typeorm";

export class true1605523817933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_entity" DROP "testtt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_entity" ADD "testtt" boolean`);
    }

}
