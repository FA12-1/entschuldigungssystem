import { NextFunction, Response } from 'express';
import z from 'zod';
import { DBCommunity } from '../../models/community';
import { AuthRequest } from '../../util';

const schema = z
	.object({
		name: z.string().max(100),
	})
	.strict();
type Data = z.infer<typeof schema>;
const validate = (data: Data) => schema.parse(data);

type Req = AuthRequest<{}, {}, Data>;

export async function addCommunity(req: Req, res: Response, next: NextFunction) {
	try {
		const data = validate(req.body);

		// check if community already exists
		const existingCommunity = await DBCommunity.findOneBy({ name: data.name });
		if (existingCommunity) {
			return res.status(400).send(`Community '${data.name}' already exists.`);
		}

		// create new community
		const newCommunity = DBCommunity.create({ ...data });
		await newCommunity.save();

		return res.status(201).send(newCommunity);
	} catch (err) {
		return next(err);
	}
}
