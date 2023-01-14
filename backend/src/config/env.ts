import dotenv from 'dotenv';
import { cleanEnv, str, num, bool } from 'envalid';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const ENV = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['production', 'test', 'development'], default: 'development' }),
	PORT: str({ default: '3001' }),
	DB_HOST: str(),
	DB_PORT: num(),
	DB_USERNAME: str(),
	DB_PASSWORD: str(),
	DB_NAME: str(),
	DB_LOGGING_ENABLED: bool({ default: false }),
	ADMIN_FIRSTNAME: str({ default: 'Admin' }),
	ADMIN_LASTNAME: str({ default: 'Admin' }),
	ADMIN_EMAIL: str({ default: 'admin@example.com' }),
	ADMIN_TOKEN: str({ default: '9335f4e7-6171-44d9-90cb-475f1685b05f' }),
});
