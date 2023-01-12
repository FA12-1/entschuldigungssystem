import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    SYSTEM_NAME: process.env.SYSTEM_NAME,
    API_PORT: Number(process.env.API_PORT),
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: Number(process.env.DATABASE_PORT),
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_NAME: process.env.DATABASE_NAME,
    LOGLEVEL: process.env.LOGLEVEL
}