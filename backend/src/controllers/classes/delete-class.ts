import { NextFunction, Response } from 'express';
import { DBCommunity } from '../../models/community';
import { AuthRequest, checkUuid } from '../../util';

type Req = AuthRequest<{ id: string }>;

export const deleteClass = async (req: Req, res: Response, next: NextFunction) => {
	try {
		checkUuid(req.params.id);

		// check if class exists
		const _class = await DBCommunity.findOneBy({ id: req.params.id });
		if (!_class) {
			return res.status(400).send(`Class with ID '${req.params.id}' does not exist.`);
		}

		const removedClass = await DBCommunity.delete({ id: req.params.id });
		return res.status(200).send('OK');
	} catch (err) {
		return next(err);
	}
};
