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

export async function addClass(req: Req, res: Response, next: NextFunction) {
	try {
		const data = validateData(req.body);

		// check if class already exists
		const existingClass = await DBCommunity.findOne({ where: { name: data.name } });
		if (existingClass) {
			return res.status(400).send(`Class '${data.name}' already exists.`);
		}

		// create new class
		const newClass = DBCommunity.create({
			name: data.name,
		});
		await newClass.save();

		return res.status(201).send(newClass);
	} catch (err) {
		return next(err);
	}
}
