import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Core } from './lib/core';
import { CONFIG } from "./config";
import { Logger } from './lib/logger';
import * as path from 'path';

const APP = express();
const PORT = CONFIG.API_PORT;
const BASE_PATH = path.resolve('.');

Logger.ever(CONFIG.SYSTEM_NAME + ' startet auf Port ' + PORT + ' im Anwendungspfad ' + BASE_PATH, { category: 'BASE' });

AppDataSource.initialize() // initializes Database-Connection
    .then((dataSource) => {
        APP.listen(PORT, () => {
            Logger.ever('WebSockets sind unter Port ' + PORT + ' gestartet.', { category: 'BASE' })
        })
        APP.use(express.json());              
        const CORE = new Core(APP, BASE_PATH); // creates instance of the Core-class
    })
    .catch((error) => console.log(error))