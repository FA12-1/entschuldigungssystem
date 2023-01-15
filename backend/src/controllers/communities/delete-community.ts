import { AuthController } from '../../util';
import { findCommunity } from '../../util/data';

type Params = {
	id: string;
};

export const deleteCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		const { id } = req.params;

		// find community
		const community = await findCommunity({ id });
		await community.remove();

		return res.status(200).send(id);
	} catch (err) {
		return next(err);
	}
};
