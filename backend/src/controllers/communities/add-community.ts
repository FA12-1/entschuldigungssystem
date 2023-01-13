import { NextFunction, Response } from 'express';
import z from 'zod';
import { DBCommunity } from '../../models/community';
import { AuthRequest } from '../../util';

type Data = {
	name: string;
};

function validateData(data: Data) {
	const schema = z
		.object({
			name: z.string().max(100),
		})
		.strict();

	return schema.parse(data);
}

type Req = AuthRequest<{}, {}, Data>;

export async function addCommunity(req: Req, res: Response, next: NextFunction) {
	try {
		const data = validateData(req.body);

		// check if community already exists
		const existingCommunity = await DBCommunity.findOneBy({ name: data.name });
		if (existingCommunity) {
			return res.status(400).send(`Community '${data.name}' already exists.`);
		}

		// create new community
		const newCommunity = DBCommunity.create({
			name: data.name,
		});
		await newCommunity.save();

		return res.status(201).send(newCommunity);
	} catch (err) {
		return next(err);
	}
}
