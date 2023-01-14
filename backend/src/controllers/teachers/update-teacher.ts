import { z } from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

const schema = z.object({
	firstName: z.string().max(50).optional(),
	lastName: z.string().max(50).optional(),
	email: z.string().email().optional(),
});
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Params = { id: string };

export const updateTeacher: AuthController<Params, Data> = async (req, res, next) => {
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
