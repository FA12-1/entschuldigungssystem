import { AuthController } from '../../util';
import { findStudent } from '../../util/data';

type Params = { id: string };

export const getStudent: AuthController<Params> = async (req, res, next) => {
	try {
		const student = await findStudent({
			id: req.params.id,
			withCommunity: true,
			withAbsences: req.user?.type === 'admin' || req.user?.type === 'teacher',
			withToken: req.user?.type === 'admin' || req.user?.type === 'teacher',
		});

		return res.status(200).send(student);
	} catch (err) {
		return next(err);
	}
};
