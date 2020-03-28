import { parse } from 'pg-connection-string';
import { config } from 'dotenv';

config();

require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL;
const connOptions: any = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/../migrations/*{.ts,.js}',
  ],
};

// On heroku we use a connection string
if (databaseUrl) {
  const connectionOptions = parse(databaseUrl);
  connOptions.host = connectionOptions.host;
  connOptions.port = parseInt(connectionOptions.port, 10),
  connOptions.username = connectionOptions.user,
  connOptions.password = connectionOptions.password,
  connOptions.database = connectionOptions.database,
  connOptions.extra = {
    ssl: connectionOptions.ssl || false
  };
}

module.exports = connOptions;
