import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1654816579350 implements MigrationInterface {
    name = 'initialMigration1654816579350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shared_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stablishment_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_0a62cdfa7abdfe50d78e123eaa" UNIQUE ("product_id"), CONSTRAINT "PK_4eaa2ad78ad4ce370f06312be54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stablishment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c86a0c760c4dcc50f7b0b9c1a91" UNIQUE ("name"), CONSTRAINT "PK_a00d7d4a85e78eccbba4e95fd10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "stablishment_id" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_of_interest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_price" integer NOT NULL, "end_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_487866e405e0c6e70bfb3e3143" UNIQUE ("product_id"), CONSTRAINT "PK_10400fa5068d3268f2dcbd56b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "token" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_code" text NOT NULL, "user_id" uuid NOT NULL, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shared_product" ADD CONSTRAINT "FK_0a62cdfa7abdfe50d78e123eaa8" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_product" ADD CONSTRAINT "FK_ebef8af721aca090bc29b780a0c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2e3d2dd2964c322482dd3603605" FOREIGN KEY ("stablishment_id") REFERENCES "stablishment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" ADD CONSTRAINT "FK_487866e405e0c6e70bfb3e31436" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" ADD CONSTRAINT "FK_f5ab4196e05234b385dd6113760" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_of_interest" DROP CONSTRAINT "FK_f5ab4196e05234b385dd6113760"`);
        await queryRunner.query(`ALTER TABLE "product_of_interest" DROP CONSTRAINT "FK_487866e405e0c6e70bfb3e31436"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2e3d2dd2964c322482dd3603605"`);
        await queryRunner.query(`ALTER TABLE "shared_product" DROP CONSTRAINT "FK_ebef8af721aca090bc29b780a0c"`);
        await queryRunner.query(`ALTER TABLE "shared_product" DROP CONSTRAINT "FK_0a62cdfa7abdfe50d78e123eaa8"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "product_of_interest"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "stablishment"`);
        await queryRunner.query(`DROP TABLE "shared_product"`);
    }

}
