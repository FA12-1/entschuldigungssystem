import { DBCommunity } from '../../../models/community';
import { DBTeacher } from '../../../models/teacher';
import { AuthController } from '../../../util';

type Params = {
	id: string;
	teacherid: string;
};

export const removeTeacherFromCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		const { id, teacherid } = req.params;

		// find community
		const community = await DBCommunity.findOne({
			where: { id: id },
			relations: { teachers: true },
		});
		if (!community) {
			return res.status(404).send(`Community with ID '${id}' does not exist.`);
		}

		// find teacher
		const teacher = await DBTeacher.findOne({
			where: { id: teacherid },
			relations: { communities: true },
		});
		if (!teacher) {
			return res.status(404).send(`Teacher with ID '${teacherid}' does not exist.`);
		}

		// remove teacher from community
		community.teachers = community.teachers.filter((x) => x.id !== teacher.id);
		await community.save();

		// return updated community
		return res.status(200).send(community);
	} catch (err) {
		return next(err);
	}
};
