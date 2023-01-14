import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

const schema = z.object({
	firstName: z.string().max(50).optional(),
	lastName: z.string().max(50).optional(),
	email: z.string().email().optional(),
});
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Req = AuthRequest<{ id: string }, {}, Data>;

export const updateTeacher = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const data = validate(req.body);

		// check if teacher exists
		const teacher = await DBTeacher.findOne({ where: { id: req.params.id } });
		if (!teacher) {
			return res.status(404).send(`Teacher with ID '${req.params.id}' does not exist.`);
		}

		// update teacher
		Object.assign(teacher, data);
		await teacher.save();

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
