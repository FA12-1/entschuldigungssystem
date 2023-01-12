import { DataSource } from "typeorm";
import { CONFIG } from "./config";
import { DBAbsence } from "./entities/absence";
import { DBAdmin } from "./entities/admin";
import { DBClass } from "./entities/class";
import { DBProffessor } from "./entities/professor";
import { DBStudent } from "./entities/student";
import { DBToken } from "./entities/token";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: CONFIG.DATABASE_HOST,
    port: CONFIG.DATABASE_PORT,
    username: CONFIG.DATABASE_USER,
    password: CONFIG.DATABASE_PASS,
    database: CONFIG.DATABASE_NAME, 
    synchronize: true, // wenn das true ist, wird das DB Schema neu eingespielt.
    logging: false,
    entities: [DBAbsence, DBAdmin, DBClass, DBProffessor, DBStudent, DBToken],
    subscribers: [],
    migrations: [],
})