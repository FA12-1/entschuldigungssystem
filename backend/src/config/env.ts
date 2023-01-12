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
	ADMIN_TOKEN: str(),
	ADMIN_EMAIL: str({ default: 'admin@example.com' }),
	ADMIN_PASSWORD: str({ default: 'admin' }),
});
