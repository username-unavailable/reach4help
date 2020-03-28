import {MigrationInterface, QueryRunner} from "typeorm";

export class Authentication1585161643005 implements MigrationInterface {
  // TODO: Check if JWT Token can manage expiration_time
  readonly createQuery = `
    CREATE TYPE "auth_type" AS ENUM ('facebook');
    CREATE TYPE "auth_state" AS ENUM ('active','idle','deleted');
    CREATE TABLE "authentication" (
      "id" BIGSERIAL PRIMARY KEY NOT NULL,
      "type" auth_type NOT NULL,
      "token_hash" TEXT NOT NULL,
      "expiration_time" TIMESTAMP WITH TIME ZONE NOT NULL,
      "last_activity" TIMESTAMP WITH TIME ZONE NOT NULL,
      "status" auth_state NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP WITH TIME ZONE
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
