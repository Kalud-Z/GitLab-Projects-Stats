import {MigrationInterface, QueryRunner} from "typeorm";

export class addedGroupInfoTable1605527958699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "group_info_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "projectId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "group_info_entity" ADD CONSTRAINT "fk_599f59ec1732245e40fc711cdf1" FOREIGN KEY ("projectId") REFERENCES "project_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group_info_entity" DROP CONSTRAINT "fk_599f59ec1732245e40fc711cdf1"`);
        await queryRunner.query(`DROP TABLE "group_info_entity"`);
    }

}
