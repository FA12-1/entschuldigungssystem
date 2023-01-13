import { NextFunction, Response } from 'express';
import { DBCommunity } from '../../models/community';
import { AuthRequest, checkUuid } from '../../util';

type Req = AuthRequest<{ id: string }>;

export const deleteCommunity = async (req: Req, res: Response, next: NextFunction) => {
	try {
		checkUuid(req.params.id);

		// check if community exists
		const community = await DBCommunity.findOneBy({ id: req.params.id });
		if (!community) {
			return res.status(400).send(`Community with ID '${req.params.id}' does not exist.`);
		}

		await DBCommunity.delete({ id: req.params.id });
		return res.status(200).send('OK');
	} catch (err) {
		return next(err);
	}
};
