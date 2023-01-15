import { findTeacher } from './../../../util/data';
import { AuthController } from '../../../util';
import { findCommunity } from '../../../util/data';

type Params = {
	id: string;
	teacherid: string;
};

export const removeTeacherFromCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		const { id, teacherid } = req.params;

		// find community
		const community = await findCommunity({ id, withTeachers: true });

		// find teacher
		const teacher = await findTeacher({ id: teacherid });

		// remove teacher from community
		community.teachers = community.teachers.filter((x) => x.id !== teacher.id);
		await community.save();

		// return updated community
		return res.status(200).send(teacherid);
	} catch (err) {
		return next(err);
	}
};
