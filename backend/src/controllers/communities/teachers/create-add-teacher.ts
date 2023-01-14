import { z } from 'zod';
import { DBCommunity } from '../../../models/community';
import { DBTeacher } from '../../../models/teacher';
import { AuthController } from '../../../util';

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
		const community = await DBCommunity.findOne({
			where: { id: req.params.id },
			relations: { teachers: true },
		});
		if (!community) {
			return res.status(400).send(`Class with ID '${req.params.id}' does not exist.`);
		}

		// create teacher
		const existingTeacher = await DBTeacher.findOneBy({ email: data.email });
		if (existingTeacher) {
			return res.status(400).send(`Teacher with email '${data.email}' already exists.`);
		}
		const teacher = await DBTeacher.create({ ...data });
		await teacher.save();

		// add teacher to community
		community.teachers.push(teacher);
		await community.save();

		return res.status(200).send(community);
	} catch (err) {
		return next(err);
	}
};
