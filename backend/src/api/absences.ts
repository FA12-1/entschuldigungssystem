import { Request } from "express";
import { DBAdmin } from "../entities/admin";
import { IAPIResponse } from "../interfaces/IAPIResponse";
import { APIBase } from "../lib/apiBaseNew";
import { APISystem } from "../lib/apiSystem";

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

    checkAppToken(token: string) {
        if (token == '481923pkfui932iktjhui891okjnji987ujgmoa') {
            return true;
        } else {
            return false;
        }
        // this function should check an request and return true, if the header contains an valid Token.
        // token needs to be stored somewhere
    }

    checkAuthToken(token: string): 'ADMIN' | 'STUDENT' | 'PROFESSOR' {
        // this function should retrive the user type of the submitted token
        return 'STUDENT';
    }

    checkBothTokens(req: Request) {
        const appToken = req.header('x-app-token');
        const authToken = req.header('x-auth-token');
        let appTokenValid = false;
        let authTokenLevel = '';
        if (appToken) {
            appTokenValid = this.checkAppToken(appToken);
        }
        if (authToken) {
            authTokenLevel = this.checkAuthToken(authToken);
        }
        return [appTokenValid, authTokenLevel];
    }

    async createAdmin(name: string, email: string, password: string) {
        const newAdmin = await DBAdmin.save(DBAdmin.create({}))
    }

    initRoutes() {
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'admins',
            method: 'GET',
            onCall: async (req, res) => {
                const [appTokenValid, authTokenLevel] = this.checkBothTokens(req);
                const response: IAPIResponse = {
                    header: {
                        success: (appTokenValid ? true : false),
                        message: ''
                    },
                    // todo jan, warum nicht top level?
                    data: {
                        admins: (appTokenValid ? await DBAdmin.find() : [])
                    }
                }
                res.send(response);
                //res.send('appToken: ' + appToken + ', valid: ' +  appTokenValid + ' | authToken: ' + authToken + ', level: ' + authTokenLevel);
                // should resolve all admins
            }
        });
    }

}