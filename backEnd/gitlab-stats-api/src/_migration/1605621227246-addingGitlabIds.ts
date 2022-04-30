import {MigrationInterface, QueryRunner} from "typeorm";

export class addingGitlabIds1605621227246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_entity" ADD "gitlabId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_entity" ADD "gitlabId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."project_entity" ADD "gitlabId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."group_entity" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."group_entity" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."project_entity" DROP "gitlabId"`);
        await queryRunner.query(`ALTER TABLE "public"."pipeline_entity" DROP "gitlabId"`);
        await queryRunner.query(`ALTER TABLE "public"."group_entity" DROP "gitlabId"`);
    }

}
