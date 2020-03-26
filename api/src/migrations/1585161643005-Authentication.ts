import {MigrationInterface, QueryRunner} from "typeorm";

export class Authentication1585161643005 implements MigrationInterface {
  readonly createQuery = `
    CREATE TYPE "auth_type" AS ENUM ('facebook');
    CREATE TABLE "authentication" (
      "id" SERIAL PRIMARY KEY NOT NULL,
      "type" auth_type NOT NULL,
      "access_tokens_hash" VARCHAR NOT NULL,
      "expiration_time" timestamp NOT NULL,
      "last_activity" timestamp NOT NULL,
      "created_at" timestamp NOT NULL,
      "updated_at" timestamp
    );
  `;
  readonly dropQuery = `DROP TABLE IF EXISTS "authentication"`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.createQuery, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.dropQuery);
  }

}
