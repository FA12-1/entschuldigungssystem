import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { DBClass } from '../../models/class';

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

type Req = Request<{}, {}, Data>;

export async function addClass(req: Req, res: Response, next: NextFunction) {
	try {
		const data = validateData(req.body);

		// check if class already exists
		const existingClass = await DBClass.findOne({ where: { name: data.name } });
		if (existingClass) {
			return res.status(400).send(`Class '${data.name}' already exists.`);
		}

		// create new class
		const newClass = DBClass.create({
			name: data.name,
		});
		await newClass.save();

		return res.status(201).send(newClass);
	} catch (err) {
		return next(err);
	}
}
