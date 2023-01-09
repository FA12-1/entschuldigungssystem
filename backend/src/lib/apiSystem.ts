import { Request, Response } from "express";
import { NewTest } from "../api/newTestAPI";
import { IAPIRequest } from "../interfaces/IAPIRequest";
import { IAPIResponse } from "../interfaces/IAPIResponse";
import { IAPIRoute } from "../interfaces/IAPIRouteParams";
import { APIBase } from "./apiBase";
import { Core } from "./core";
import { Logger } from "./logger";

export class APISystem {
    core: Core;

    // main APIs
    newTestAPI: NewTest;

    // custom APIs go here

    constructor(core: Core) {
        this.core = core;

        // initialize core APIs
        this.newTestAPI = new NewTest(this);
        
    }

    loaded(name: string, version: number) {
        Logger.debug('Registered API ' + name + '@' + version, { category: 'API' });
        this.core.loadedPlugins.push({name: name, version: version, loadedAt: new Date(Date.now())});
    }

    /**
     * Generates the URI string for an API-Endpoint
     * @param version Version of the API
     * @param uriName URI-friendly API name
     * @param endpointName URI-friendly name of the endpoint
     * @returns a string
     */
    generateURI(version: number, uriName: string, endpointName: string) {
        return '/' + uriName + '/v' + version.toString() + '/' + endpointName;
    }

    /**
     * Überprüft, ob die aufgerufene API Route Berechtigungen erfordert.
     * Wenn ja, wird der Request geprüft, ob er dem Request-Schema entspricht und, ob
     * der mitgesandte Token die Berechtigungen erfüllt.
     * @param apiRouteParams Params, der API Route
     * @param req Express.Request-Object
     * @param res Express.Response-Object
     * @returns boolean
     */
    async checkTokenPermission(apiRouteParams: IAPIRoute, req: Request, res: Response) {
        // todo rebuilt after new tokenAPI
        const tokenResponse: IAPIResponse = {
            header: {
                success: false,
                message: '',
            },
            data: {}
        } 
        return true;
        /*
        if(apiRouteParams.neededPermission) {
            console.log('[CHECK_TOKEN_PERMISSION] ' + apiRouteParams.creatingAPI.uriName + '/v' + apiRouteParams.creatingAPI.version + '/' + apiRouteParams.endPointName + ' needs ' + apiRouteParams.neededPermission + ' Permission');
            const request: IAPIRequest = JSON.parse(JSON.stringify(req.body));
            if(!request.header) {
                tokenResponse.header.message = 'Kein Request Header gesetzt';
                res.send(tokenResponse);
                return false;
            } else if(request.header.token) {
                const token = await DBToken.findOne({ where: { id: request.header.token }});
                if(token) {
                    if(token.user.permissions == apiRouteParams.neededPermission) {
                        return true;
                    } else {
                        tokenResponse.header.message = 'Nicht die erforderlichen Berechtigungen';
                        res.send(tokenResponse);
                        return false;
                    }
                } else {
                    tokenResponse.header.message = 'Keinen zutreffenden Token gefunden'
                    res.send(tokenResponse);
                    return false;
                }
            } else {
                tokenResponse.header.message = 'Es wurde kein Token mitgesandt'
                res.send(tokenResponse);
                return false;
            }
        } else {
            return true
        }
        */
    }

    /**
     * Erstellt eine neue API-Route
     * @param apiRouteParams Parameter
     */
    createRoute(apiRouteParams: IAPIRoute) {
        const fullRoute = this.generateURI(apiRouteParams.creatingAPI.version, apiRouteParams.creatingAPI.uriName, apiRouteParams.endPointName)
        console.log('creating route of type' + apiRouteParams.method + ' at ' +  fullRoute);
        switch(apiRouteParams.method) {
            case "GET": {
                this.core.app.get(fullRoute, async (req: Request, res: Response) => {
                    if(await this.checkTokenPermission(apiRouteParams, req, res)) {
                        apiRouteParams.onCall(req, res);
                    }
                });
                break;
            }
            case "POST": {
                this.core.app.post(fullRoute, async (req: Request, res: Response) => {
                    if(await this.checkTokenPermission(apiRouteParams, req, res)) {
                        apiRouteParams.onCall(req, res);
                    }
                });
                break;
            }
            case "PUT": {
                this.core.app.put(fullRoute, async (req: Request, res: Response) => {
                    if(await this.checkTokenPermission(apiRouteParams, req, res)) {
                        apiRouteParams.onCall(req, res);
                    }
                });
                break;
            }
            case "DELETE": {
                this.core.app.delete(fullRoute, async (req: Request, res: Response) => {
                    if(await this.checkTokenPermission(apiRouteParams, req, res)) {
                        apiRouteParams.onCall(req, res);
                    }
                });
                break;
            }
            default: {
                console.log('APISystem: CreateRoute called from: ' + apiRouteParams.creatingAPI.uriName + ' for Endpoint ' + apiRouteParams.endPointName + ' failed. Specified Method not registered.');
                break;
            }
        }
    }
}