import { NextFunction, Response } from 'express';
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
			relations: { teachers: true, students: true },
			select: {
				id: true,
				name: true,
				students: {
					id: true,
				},
				teachers: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
			order: { name: 'asc' },
		});
		return res.status(200).send(communities);
	} catch (err) {
		return next(err);
	}
}
