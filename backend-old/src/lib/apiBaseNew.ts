import { IAPIMetadata } from "../interfaces/IAPIMetadata";
import { APISystem } from "./apiSystem";
import { Logger } from "./logger";

export class APIBase {
    apiLib: APISystem;
    metaData: IAPIMetadata;
    
    constructor(apiLib: APISystem, metaData: IAPIMetadata) {
        this.apiLib = apiLib;
        this.metaData = metaData;
        
        Logger.debug('New API instance created: ' + JSON.stringify(this.metaData), {category: 'API'});
        this.init();
    }

    init() {
        Logger.debug('Initialization of ' + this.metaData.apiName, {category: 'API'});
        this.registerSelf();
    }
    
    registerSelf(): void {
        Logger.debug('API trys to register itself... ' + this.metaData.apiName + '@' + this.metaData.buildNumber, { category: 'API' });
        this.apiLib.loaded(this.metaData.apiName, this.metaData.buildNumber);
    }
}