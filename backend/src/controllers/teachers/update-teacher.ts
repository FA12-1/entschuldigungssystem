import { z } from 'zod';
import { AuthController } from '../../util';
import { findTeacher } from '../../util/data';

const schema = z
	.object({
		firstName: z.string().max(50).optional(),
		lastName: z.string().max(50).optional(),
		email: z.string().email().optional(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Params = { id: string };

export const updateTeacher: AuthController<Params, Data> = async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = validate(req.body);

		// check if teacher exists
		const teacher = await findTeacher({
			id,
			withCommunities: true,
			withTokens: req.user?.type === 'admin',
		});

		// update teacher
		Object.assign(teacher, data);
		await teacher.save();

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
