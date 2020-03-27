import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

import * as config from './ormconfig';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection(config as ConnectionOptions),
  },
];
