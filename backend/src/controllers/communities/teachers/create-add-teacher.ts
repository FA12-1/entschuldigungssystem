import { z } from 'zod';
import { DBTeacher } from '../../../models/teacher';
import { AuthController } from '../../../util';
import { findCommunity } from '../../../util/data';

const schema = z
	.object({
		firstName: z.string().max(50),
		lastName: z.string().max(50),
		email: z.string().email(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Params = { id: string };

export const createTeacherAddToCommunity: AuthController<Params, Data> = async (req, res, next) => {
	try {
		const data = validate(req.body);

		// check if community exists
		const community = await findCommunity({ id: req.params.id, withTeachers: true });

		// create teacher
		const existingTeacher = await DBTeacher.findOneBy({ email: data.email });
		if (existingTeacher) {
			return res.status(400).send(`Teacher with email '${data.email}' already exists.`);
		}
		const teacher = DBTeacher.create({ ...data });
		await teacher.save();

		// add teacher to community
		community.teachers.push(teacher);
		await community.save();

		return res.status(200).send(community);
	} catch (err) {
		return next(err);
	}
};
