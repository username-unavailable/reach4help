CREATE TYPE "auth_type" AS ENUM (
  'facebook'
);

CREATE TABLE "authentication" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "type" auth_type NOT NULL,
  "access_tokens_hash" VARCHAR NOT NULL,
  "expiration_time" timestamp NOT NULL,
  "last_activity" timestamp NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "authentication_id" INT NOT NULL,
  "contact_id" INT,
  "address_id" INT,
  "username" VARCHAR NOT NULL,
  "name" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "code" VARCHAR,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "country_id" INT NOT NULL,
  "street" VARCHAR NOT NULL,
  "city" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "contact" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR NOT NULL,
  "phone" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "request" (
  "id" SERIAL PRIMARY KEY,
  "requester_id" INT,
  "volunteer_id" INT,
  "description" VARCHAR NOT NULL,
  "status" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "team" (
  "id" SERIAL PRIMARY KEY,
  "address_id" INT,
  "name" VARCHAR,
  "organization_id" INT,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "team_user" (
  "id" SERIAL PRIMARY KEY,
  "team_id" INT,
  "user_id" INT,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "organization" (
  "id" SERIAL PRIMARY KEY,
  "contact_id" INT,
  "address_id" INT,
  "name" VARCHAR,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

ALTER TABLE "contact" ADD FOREIGN KEY ("id") REFERENCES "user" ("contact_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "user" ("address_id");

ALTER TABLE "country" ADD FOREIGN KEY ("id") REFERENCES "address" ("country_id");

ALTER TABLE "authentication" ADD FOREIGN KEY ("id") REFERENCES "user" ("authentication_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "request" ("requester_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "request" ("volunteer_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "team" ("address_id");

ALTER TABLE "organization" ADD FOREIGN KEY ("id") REFERENCES "team" ("organization_id");

ALTER TABLE "team" ADD FOREIGN KEY ("id") REFERENCES "team_user" ("team_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "team_user" ("user_id");

ALTER TABLE "contact" ADD FOREIGN KEY ("id") REFERENCES "organization" ("contact_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "organization" ("address_id");

CREATE UNIQUE INDEX "unique_username" ON "user" ("username");
