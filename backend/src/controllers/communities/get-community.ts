import { findCommunity } from './../../util/data';
import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

type Params = {
	id: string;
};

export const getCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		const { id } = req.params;

		// find community
		const community = await findCommunity({
			id,
			withTeachers: true,
			withStudents: true,
			withTokens: req.user?.type === 'admin',
		});
		// const community = await DBCommunity.findOne({
		// 	where: { id: req.params.id },
		// 	relations: {
		// 		teachers: true,
		// 		students: true,
		// 	},
		// 	select: {
		// 		id: true,
		// 		name: true,
		// 		updatedAt: true,
		// 		teachers: {
		// 			id: true,
		// 			firstName: true,
		// 			lastName: true,
		// 			// email: true,
		// 		},
		// 		students: {
		// 			id: true,
		// 			firstName: true,
		// 			lastName: true,
		// 			// email: true,
		// 		},
		// 	},
		// 	order: {
		// 		teachers: { lastName: 'asc', firstName: 'asc' },
		// 		students: { lastName: 'asc', firstName: 'asc' },
		// 	},
		// });

		// if (!community) {
		// 	return res.status(404).send(`Community with ID '${req.params.id}' does not exist.`);
		// }

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
