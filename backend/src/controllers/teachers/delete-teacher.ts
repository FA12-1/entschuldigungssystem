import { findTeacher } from './../../util/data';
import { AuthController } from '../../util';

type Params = { id: string };

export const deleteTeacher: AuthController<Params> = async (req, res, next) => {
	try {
		const { id } = req.params;

		// check if teacher exists
		const teacher = await findTeacher({ id });

		// delete teacher
		await teacher.remove();

		return res.status(200).send(id);
	} catch (err) {
		return next(err);
	}
};
