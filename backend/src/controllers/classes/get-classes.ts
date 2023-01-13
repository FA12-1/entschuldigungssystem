import { NextFunction, Request, Response } from 'express';
import { DBCommunity } from '../../models/community';

export async function getClasses(req: Request, res: Response, next: NextFunction) {
	try {
		const classes = await DBCommunity.find({ order: { name: 'asc' } });
		return res.status(200).send(classes);
	} catch (err) {
		return next(err);
	}
}
