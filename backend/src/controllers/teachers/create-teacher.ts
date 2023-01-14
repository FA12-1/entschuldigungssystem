import { z } from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

const schema = z
	.object({
		firstName: z.string().max(50),
		lastName: z.string().max(50),
		email: z.string().email(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

export const createTeacher: AuthController<{}, Data> = async (req, res, next) => {
	try {
		const data = validate(req.body);

		// check if teacher already exists
		const existingTeacher = await DBTeacher.findOneBy({ email: data.email });
		if (existingTeacher) {
			return res.status(400).send(`Teacher with email '${data.email}' already exists.`);
		}

		// create new teacher
		const newTeacher = DBTeacher.create({ ...data });
		await newTeacher.save();

		return res.status(201).send(newTeacher);
	} catch (err) {
		return next(err);
	}
};
