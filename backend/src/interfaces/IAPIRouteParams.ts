import { APIBase } from "../lib/apiBase";
import { Request, Response } from "express";

export interface IAPIRoute {
    method: APIRouteMethod
    creatingAPI: APIBase;
    endPointName: string;
    onCall: (req: Request, res: Response) => void;
    neededPermission?: TokenPermission;
}