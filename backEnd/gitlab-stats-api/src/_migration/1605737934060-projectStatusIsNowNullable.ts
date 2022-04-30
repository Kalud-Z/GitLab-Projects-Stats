import {MigrationInterface, QueryRunner} from "typeorm";

export class projectStatusIsNowNullable1605737934060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."project_entity" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."project_entity" ALTER COLUMN "status" DROP NOT NULL`);
    }

}
