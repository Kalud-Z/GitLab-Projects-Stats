import {MigrationInterface, QueryRunner} from "typeorm";

export class addedSubGroups1605865792962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_entity" ADD "parentGroupId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."group_entity" ADD CONSTRAINT "fk_c203b6051f36ce269f89baf254a" FOREIGN KEY ("parentGroupId") REFERENCES "group_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."group_entity" DROP CONSTRAINT "fk_c203b6051f36ce269f89baf254a"`);
        await queryRunner.query(`ALTER TABLE "public"."group_entity" DROP "parentGroupId"`);
    }

}
