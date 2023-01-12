import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { DBClass } from '../../models/class';
import { checkUuid } from '../../util';

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

type Req = Request<{ id: string }, {}, Data>;

export async function updateClass(req: Req, res: Response, next: NextFunction) {
	try {
		checkUuid(req.params.id);
		const data = validateData(req.body);

		// check if class exists
		const _class = await DBClass.findOne({ where: { id: req.params.id } });
		if (!_class) {
			return res.status(400).send(`Class with ID '${req.params.id}' does not exist.`);
		}

		// update class
		_class.name = data.name;
		await _class.save();

		return res.status(201).send(_class);
	} catch (err) {
		return next(err);
	}
}
