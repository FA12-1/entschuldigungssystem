import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../util';

export const removeTeacherFromCommunity = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	return res.status(200).send('ok');
};
