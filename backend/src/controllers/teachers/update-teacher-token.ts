import { findTeacher } from './../../util/data';
import { v4 as uuidv4 } from 'uuid';
import { AuthController } from '../../util';

type Params = { id: string };

export const updateTeacherToken: AuthController<Params> = async (req, res, next) => {
	try {
		const { id } = req.params;

		// check if teacher exists
		const teacher = await findTeacher({
			id,
			withCommunities: true,
			withTokens: req.user?.type === 'admin',
		});

		// update teacher
		teacher.token = uuidv4();
		await teacher.save();

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
