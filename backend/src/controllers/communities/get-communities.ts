import { NextFunction, Request, Response } from 'express';
import { DBCommunity } from '../../models/community';

export async function getCommunities(req: Request, res: Response, next: NextFunction) {
	try {
		const communities = await DBCommunity.find({
			order: { name: 'asc' },
			relations: {
				teachers: true,
			},
		});
		return res.status(200).send(communities);
	} catch (err) {
		return next(err);
	}
}
