import { NextFunction, Response } from 'express';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

export const getTeachers = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const teachers = await DBTeacher.find({
			select: ['id', 'name', 'email'],
			order: { name: 'asc' },
		});

		return res.status(200).send(teachers);
	} catch (err) {
		return next(err);
	}
};
