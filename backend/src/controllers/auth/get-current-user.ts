import { DBAdmin } from './../../models/admin';
import { DBTeacher } from './../../models/teacher';
import { NextFunction, Response } from 'express';
import { DBStudent } from '../../models/student';
import { AuthRequest } from '../../util';

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const user: any = {};

		if (req.user === undefined) {
			throw new Error('User not found');
		}

		if (req.user instanceof DBStudent) user.type = 'student';
		if (req.user instanceof DBTeacher) user.type = 'teacher';
		if (req.user instanceof DBAdmin) user.type = 'admin';

		user.id = req.user.id;
		user.firstName = req.user.firstName;
		user.lastName = req.user.lastName;
		user.email = req.user.email;

		return res.status(200).send(user);
	} catch (err) {
		return next(err);
	}
};
