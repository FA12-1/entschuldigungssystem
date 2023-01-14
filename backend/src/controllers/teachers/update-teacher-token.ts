import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

type Req = AuthRequest<{ id: string }>;

export const updateTeacherToken = async (req: Req, res: Response, next: NextFunction) => {
	try {
		// check if teacher exists
		const teacher = await DBTeacher.findOne({ where: { id: req.params.id } });
		if (!teacher) {
			return res.status(404).send(`Teacher with ID '${req.params.id}' does not exist.`);
		}

		// update teacher
		teacher.token = uuidv4();
		await teacher.save();

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
