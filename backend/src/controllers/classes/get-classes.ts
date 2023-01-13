import { NextFunction, Request, Response } from 'express';
import { DBClass } from '../../models/class';

export async function getClasses(req: Request, res: Response, next: NextFunction) {
	try {
		const classes = await DBClass.find({ order: { name: 'asc' } });
		return res.status(200).send(classes);
	} catch (err) {
		return next(err);
	}
}
