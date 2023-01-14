import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { DBCommunity } from '../../../models/community';
import { DBTeacher } from '../../../models/teacher';
import { AuthRequest } from '../../../util';

type Data = {
	name: string;
	email: string;
};

function validateData(data: Data) {
	const schema = z.object({
		name: z.string().max(100),
		email: z.string().email(),
	});

	return schema.parse(data);
}

type Req = AuthRequest<{ id: string }, {}, Data>;

export const createAndAddTeacherToCommunity = async (
	req: Req,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = validateData(req.body);

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
