import { APIBase } from "../lib/apiBaseNew";
import { APISystem } from "../lib/apiSystem";
import { Core } from "../lib/core";

export class NewTest extends APIBase {
    constructor(apiSystem: APISystem) {
        super(apiSystem, {
           apiName: 'newTest',
           buildNumber: 1,
           requirements: {
            minSimpleAPIBuild: 0,
            maxSimpleAPIBuild: 0
           }
        })
    }

    init() {
        console.log('Initializion of NewTest...')
        super.init();
    }

}