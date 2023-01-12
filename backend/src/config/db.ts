import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { entities } from '../models';
import { ENV } from './env';

export const datasource: DataSource = new DataSource({
	type: 'postgres',
	host: ENV.DB_HOST,
	username: ENV.DB_USERNAME,
	password: ENV.DB_PASSWORD,
	database: ENV.DB_NAME,
	synchronize: true,
	logging: ENV.DB_LOGGING_ENABLED,
	// entities: entities,
});
