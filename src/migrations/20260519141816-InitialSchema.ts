import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema20260519141816 implements MigrationInterface {
    name = 'InitialSchema20260519141816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plataformas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomePlataforma" character varying(255) NOT NULL, "urlPrincipal" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_35ecbf297fb3e72ec938e63f26a" UNIQUE ("nomePlataforma"), CONSTRAINT "PK_5e661b0dfc8473459679ff80563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idPlataforma" uuid NOT NULL, "idItemPlataforma" character varying(255), "nomeItem" character varying(255) NOT NULL, "descItem" text, "valorItem" numeric(10,2) NOT NULL, "linkItem" text, "linkAfiliado" text, "vendedor" character varying(255), "valorAvaliacao" numeric(3,2), "itemsVendidos" integer NOT NULL DEFAULT '0', "entregaFull" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idItem" uuid NOT NULL, "imageBase64" text, "linkImage" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_880a8bd11dbf0a56a9ffce8d9cb" FOREIGN KEY ("idPlataforma") REFERENCES "plataformas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_92548e11a5649f0059af2984e2b" FOREIGN KEY ("idItem") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_92548e11a5649f0059af2984e2b"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_880a8bd11dbf0a56a9ffce8d9cb"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "plataformas"`);
    }

}
