import { APISystem } from "./apiSystem";

export class APIBase {
    version: number; // Version of API
    uriName: string; // URI friendly Name of API (localhost/version/uriName)
    apilib: APISystem;
    dependencies: {apiName: string, minVersion: number, maxVersion: number}[]; 
    // todo implement a check at api initialization, try to check, if all needed apis are loaded before loading the new one
    // todo if the dependency-check fails, we need to output an error and stop loading the plugin

    constructor(APIlib: APISystem) {
        this.apilib = APIlib;
        this.initAPI();
        this.initRoutes();
    }

    initAPI() {
        this.apilib.loaded(this.uriName, this.version);
    }

    initRoutes() {

    }
}