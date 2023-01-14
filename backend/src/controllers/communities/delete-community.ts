import { DBCommunity } from '../../models/community';
import { AuthController, checkUuid } from '../../util';

type Params = { id: string };

export const deleteCommunity: AuthController<Params> = async (req, res, next) => {
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
