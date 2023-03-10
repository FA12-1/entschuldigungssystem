import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { DBCommunity } from '../../models/community';
import { DBTeacher } from '../../models/teacher';
import { AuthRequest, checkUuid } from '../../util';

type Data = {
	name: string;
};

function validateData(data: Data) {
	const schema = z
		.object({
			name: z.string().max(20),
		})
		.strict();

	return schema.parse(data);
}

type Req = AuthRequest<{ id: string }, {}, Data>;

export async function updateCommunity(req: Req, res: Response, next: NextFunction) {
	try {
		checkUuid(req.params.id);
		const data = validateData(req.body);

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
}
