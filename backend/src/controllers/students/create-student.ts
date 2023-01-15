import { z } from 'zod';
import { DBStudent } from '../../models/student';
import { AuthController } from '../../util';
import { findCommunity } from '../../util/data';

const schema = z
	.object({
		firstName: z.string().max(50),
		lastName: z.string().max(50),
		email: z.string().email(),
		birthday: z.string().datetime(),
		community: z.string().uuid().optional(),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

export const createStudent: AuthController<{}, Data> = async (req, res, next) => {
	try {
		const { community: communityId, ...data } = validate(req.body);

		// check if student already exists
		const existingStudent = await DBStudent.findOneBy({ email: data.email });
		if (existingStudent) {
			return res.status(400).send(`Student with email '${data.email}' already exists.`);
		}

		// create new student
		const newStudent = DBStudent.create({ ...data });

		// add community to student
		if (communityId) {
			newStudent.community = await findCommunity(
				{ id: communityId },
				{ select: { id: true, name: true } }
			);
		}

		await newStudent.save();

		return res.status(201).send(newStudent);
	} catch (err) {
		return next(err);
	}
};
