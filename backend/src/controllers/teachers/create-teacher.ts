import { z } from 'zod';
import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';
import { findCommunity } from '../../util/data';

const schema = z
	.object({
		firstName: z.string().max(50),
		lastName: z.string().max(50),
		email: z.string().email(),
		community: z.string().uuid().optional(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

export const createTeacher: AuthController<{}, Data> = async (req, res, next) => {
	try {
		const { community: communityId, ...data } = validate(req.body);

		// check if teacher already exists
		const existingTeacher = await DBTeacher.findOneBy({ email: data.email });
		if (existingTeacher) {
			return res.status(400).send(`Teacher with email '${data.email}' already exists.`);
		}

		// create new teacher
		const newTeacher = DBTeacher.create({ ...data });

		// add community to teacher
		if (communityId) {
			const community = await findCommunity(
				{ id: communityId },
				{ select: { id: true, name: true } }
			);
			newTeacher.communities = [];
			newTeacher.communities.push(community);
		}

		// save teacher to database
		await newTeacher.save();

		return res.status(201).send(newTeacher);
	} catch (err) {
		return next(err);
	}
};
