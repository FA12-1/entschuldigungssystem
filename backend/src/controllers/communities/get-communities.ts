import { NextFunction, Request, Response } from 'express';
import { DBCommunity } from '../../models/community';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

export async function getCommunities(req: AuthRequest, res: Response, next: NextFunction) {
	try {
		// if user is teacher only return communities related to the teacher
		if (req.user && req.user instanceof DBTeacher) {
			const communities = await DBCommunity.find({
				order: { name: 'asc' },
				where: {
					teachers: { id: req.user.id },
				},
				// relations: { teachers: true },
			});
			return res.status(200).send(communities);
		}

		const communities = await DBCommunity.find({
			order: { name: 'asc' },
			// relations: { teachers: true },
		});
		return res.status(200).send(communities);
	} catch (err) {
		return next(err);
	}
}
