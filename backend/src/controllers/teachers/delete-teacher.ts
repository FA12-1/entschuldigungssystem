import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

type Params = { id: string };

export const deleteTeacher: AuthController<Params> = async (req, res, next) => {
	try {
		// check if teacher exists
		const teacher = await DBTeacher.findOne({ where: { id: req.params.id } });
		if (!teacher) {
			return res.status(404).send(`Teacher with ID '${req.params.id}' does not exist.`);
		}

		// delete teacher
		await teacher.remove();

		return res.status(200).send(req.params.id);
	} catch (err) {
		return next(err);
	}
};
