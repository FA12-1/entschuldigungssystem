import { findTeacher } from './../../util/data';
import { AuthController } from '../../util';

type Params = { id: string };

export const getTeacher: AuthController<Params> = async (req, res, next) => {
	try {
		const teacher = await findTeacher({
			id: req.params.id,
			withCommunities: true,
			withTokens: req.user?.type === 'admin',
		});

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
