import { APISystem } from "./apiSystem";
import { Express } from 'express';
import { Helper } from "./helper";

export class Core {
    app: Express;
    basePath: string;
    BCRYPT_ROUNDS = 12;
    APP_TOKEN = '481923pkfui932iktjhui891okjnji987ujgmoa'
    
    helper: Helper;
    apiSystem: APISystem;
    loadedPlugins: {name: string, version: number, loadedAt: Date}[];

    constructor(app: Express, basePath: string) {
        this.app = app;
        this.basePath = basePath;
        this.loadedPlugins = [];

        this.preInit();
        
        this.helper = new Helper(this);
        this.apiSystem = new APISystem(this);
    
        this.postInit();
    }

    /**
     * First function, wich will be called right after Database-Connection and configuring of express
     */
    preInit() {

    }

    /**
     * Will be executed after initializion of all APIs
     */
    postInit() {

    }
}