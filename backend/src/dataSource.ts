import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Gift } from './gift/entities/gift.entity';
import { Property } from './property/entities/property.entity';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const dataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Gift, Property],
  synchronize: process.env.NODE_ENV !== 'production', // See the warning at https://docs.nestjs.com/techniques/database#typeorm-integration
  migrations: [],
  migrationsTableName: 'migrations',
};

const AppDataSource = new DataSource(dataSourceOptions as DataSourceOptions);

export default AppDataSource;
