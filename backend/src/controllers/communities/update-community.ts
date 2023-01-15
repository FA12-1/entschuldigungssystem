import z from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthController, checkUuid } from '../../util';
import { findCommunity } from '../../util/data';

const schema = z
	.object({
		name: z.string().max(20),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Params = { id: string };

export const updateCommunity: AuthController<Params, Data> = async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = validate(req.body);

		// find community
		const community = await findCommunity({ id, withTeachers: true });

		// find authenticated user
		if (req.user && req.user instanceof DBTeacher) {
			// check if authenticated user is a teacher of the community
			if (!community.teachers?.some((teacher) => teacher.id === req.user!.id)) {
				return res.status(401).send('Unauthorized.');
			}
		}

		// update community
		community.name = data.name;
		await community.save();

		community.teachers = undefined!;
		return res.status(201).send(community);
	} catch (err) {
		return next(err);
	}
};
