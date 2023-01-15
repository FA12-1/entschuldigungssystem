import { DBCommunity } from '../../models/community';
import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

type Params = {
	id: string;
};

export const getCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		// find community
		const community = await DBCommunity.findOne({
			where: { id: req.params.id },
			relations: {
				teachers: true,
				students: true,
			},
			select: {},
		});

		if (!community) {
			return res.status(404).send(`Community with ID '${req.params.id}' does not exist.`);
		}

		// if user is teacher, check if teacher is related to the community
		if (req.user && req.user instanceof DBTeacher) {
			if (!community.teachers.includes(req.user)) {
				return res.status(401).send('Unauthorized');
			}
		}

		return res.status(200).send(community);
	} catch (err) {
		return next(err);
	}
};
