import { NextFunction, Response } from 'express';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

type Req = AuthRequest<{ id: string }>;

export const getTeacher = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const teacher = await DBTeacher.findOne({
			where: { id: req.params.id },
			relations: {
				communities: true,
			},
			select: {
				id: true,
				name: true,
				email: true,
				communities: {
					id: true,
					name: true,
				},
			},
			order: {
				communities: {
					name: 'asc',
				},
			},
		});

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
