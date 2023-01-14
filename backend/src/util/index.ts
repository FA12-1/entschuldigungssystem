import { NextFunction, Request, Response } from 'express';
import { validate } from 'uuid';
import { User } from '../models';
import { ApiError } from '../types/error';

export const checkUuid = (value: string) => {
	if (!validate(value)) {
		throw new ApiError(400, 'Invalid UUID');
	}
};

export type AuthRequest<
	P = {},
	ResBody = any,
	ReqBody = any,
	ReqQuery = qs.ParsedQs,
	Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
	user?: User;
};

export type Controller<P = {}, ReqBody = any, ReqQuery = qs.ParsedQs> = (
	req: Request<P, {}, ReqBody, ReqQuery>,
	res: Response,
	next: NextFunction
) => Promise<any> | any;

export type AuthController<P = {}, ReqBody = any, ReqQuery = qs.ParsedQs> = (
	req: AuthRequest<P, {}, ReqBody, ReqQuery>,
	res: Response,
	next: NextFunction
) => Promise<any> | any;
