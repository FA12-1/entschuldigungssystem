import { DataSource } from "typeorm";
import { CONFIG } from "./config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: CONFIG.DATABASE_HOST,
    port: CONFIG.DATABASE_PORT,
    username: CONFIG.DATABASE_USER,
    password: CONFIG.DATABASE_PASS,
    database: CONFIG.DATABASE_NAME, 
    synchronize: true, // wenn das true ist, wird das DB Schema neu eingespielt.
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [],
})