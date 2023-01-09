import { APIBase } from "../lib/apiBaseNew";
import { Request, Response } from "express";

export interface IAPIRoute {
    method: APIRouteMethod
    creatingAPI: APIBase;
    endPointName: string;
    onCall: (req: Request, res: Response) => void;
    //neededPermission?: TokenPermission;
}