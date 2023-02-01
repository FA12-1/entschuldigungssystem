import { NextFunction, Response } from 'express';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

type Req = AuthRequest<{ id: string }>;

export const deleteTeacher = async (req: Req, res: Response, next: NextFunction) => {
	try {
		// check if teacher exists
		const teacher = await DBTeacher.findOne({ where: { id: req.params.id } });
		if (!teacher) {
			return res.status(404).send(`Teacher with ID '${req.params.id}' does not exist.`);
		}

		// delete teacher
		await teacher.remove();

		return res.status(200).send(req.params.id);
	} catch (err) {
		return next(err);
	}
};
