import { NextFunction, Response } from 'express';
import { DBStudent } from '../../models/student';
import { AuthRequest } from '../../util';

export const getStudents = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const students = await DBStudent.find({
			order: { lastName: 'asc', firstName: 'asc' },
		});

		return res.status(200).send(students);
	} catch (err) {
		return next(err);
	}
};
