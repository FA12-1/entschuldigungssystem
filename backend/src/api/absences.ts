import { APIBase } from "../lib/apiBaseNew";
import { APISystem } from "../lib/apiSystem";
import { Core } from "../lib/core";

export class AbsenceAPI extends APIBase {
    constructor(apiSystem: APISystem) {
        super(apiSystem, {
           apiName: 'absence',
           buildNumber: 1,
           requirements: {
            minSimpleAPIBuild: 0,
            maxSimpleAPIBuild: 0
           }
        })
    }

    init() {
        console.log('Initializion of Absence...')
        super.init();
        this.initRoutes();
    }

    checkHeaderToken() {
        // this funktion should check an request and return true, if the header contains an valid Token.
        // token needs to be stored somewhere
    }

    initRoutes() {
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'admins',
            method: 'GET',
            onCall: (req, res) => {
                // should resolve all admins
            }
        });
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'admins',
            method: 'POST',
            onCall: (req, res) => {
                // should add an admin-account
            }
        })
    }

}