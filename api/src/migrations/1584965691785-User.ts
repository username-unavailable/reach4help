import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1584965691785 implements MigrationInterface {
  readonly createQuery = `
    CREATE TABLE "user" (
    id SERIAL NOT NULL,
    authentication_id INT NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
    );`
  ;
  readonly dropQuery = `DROP TABLE IF EXISTS "user"`;

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(this.createQuery);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(this.dropQuery);
  }
}
