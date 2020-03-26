import {MigrationInterface, QueryRunner} from "typeorm";

export class Authentication1585161643005 implements MigrationInterface {
  readonly createQuery = `
    CREATE TYPE "auth_type" AS ENUM ('facebook');
    CREATE TYPE "auth_state" AS ENUM ('active','idle','deleted');
    CREATE TABLE "authentication" (
      "id" SERIAL PRIMARY KEY NOT NULL,
      "type" auth_type NOT NULL,
      "token_hash" VARCHAR NOT NULL,
      "expiration_time" timestamp NOT NULL, // TODO: Check if JWT Token can manage expiration_time
      "last_activity" timestamp NOT NULL,
      "status" uth_state NOT NULL,
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
