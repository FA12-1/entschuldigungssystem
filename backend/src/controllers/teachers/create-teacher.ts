import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest } from '../../util';

const schema = z
	.object({
		name: z.string().max(100),
		email: z.string().email(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Req = AuthRequest<{}, {}, Data>;

export const createTeacher = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const data = validate(req.body);

		// check if teacher already exists
		const existingTeacher = await DBTeacher.findOneBy({ name: data.name });
		if (existingTeacher) {
			return res.status(400).send(`Teacher '${data.name}' already exists.`);
		}

		// create new teacher
		const newTeacher = DBTeacher.create({ ...data });
		await newTeacher.save();

		return res.status(201).send(newTeacher);
	} catch (err) {
		return next(err);
	}
};
