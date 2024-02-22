import { DataSourceOptions } from 'typeorm';

export default {
  name: 'default',
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  autoLoadEntities: true,
  entities: ['dist/src/entities/**{.ts,.js}'],
} as DataSourceOptions;
