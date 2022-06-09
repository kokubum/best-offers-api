import {MigrationInterface, QueryRunner} from "typeorm";

export class createProductStablishmentAndInterestTables1654811528529 implements MigrationInterface {
    name = 'createProductStablishmentAndInterestTables1654811528529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stablishment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a00d7d4a85e78eccbba4e95fd10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_of_interest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_price" integer NOT NULL, "end_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_487866e405e0c6e70bfb3e3143" UNIQUE ("product_id"), CONSTRAINT "PK_10400fa5068d3268f2dcbd56b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "stablishment_id" uuid, "user_id" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" ADD CONSTRAINT "FK_487866e405e0c6e70bfb3e31436" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" ADD CONSTRAINT "FK_f5ab4196e05234b385dd6113760" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2e3d2dd2964c322482dd3603605" FOREIGN KEY ("stablishment_id") REFERENCES "stablishment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_3e59a34134d840e83c2010fac9a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2e3d2dd2964c322482dd3603605"`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" DROP CONSTRAINT "FK_f5ab4196e05234b385dd6113760"`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" DROP CONSTRAINT "FK_487866e405e0c6e70bfb3e31436"`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_of_interest"`);
        await queryRunner.query(`DROP TABLE "stablishment"`);
    }

}
