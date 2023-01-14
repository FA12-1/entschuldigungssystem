import z from 'zod';
import { DBCommunity } from '../../models/community';
import { DBTeacher } from '../../models/teacher';
import { AuthController, checkUuid } from '../../util';

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
		checkUuid(req.params.id);
		const data = validate(req.body);

		// check if community exists
		const community = await DBCommunity.findOneBy({ id: req.params.id });
		if (!community) {
			return res.status(400).send(`Community with ID '${req.params.id}' does not exist.`);
		}

		// find authenticated user
		if (req.user !== undefined && req.user instanceof DBTeacher) {
			// check if authenticated user is a teacher of the community
			if (!community.teachers?.some((teacher) => teacher.id === req.user!.id)) {
				return res.status(401).send('Permission denied.');
			}
		}

		// update community
		community.name = data.name;
		await community.save();

		return res.status(201).send(community);
	} catch (err) {
		return next(err);
	}
};
