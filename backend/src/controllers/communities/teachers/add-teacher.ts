import { DBTeacher } from '../../../models/teacher';
import { DBCommunity } from '../../../models/community';
import { AuthController } from '../../../util';

type Params = {
	id: string;
	teacherid: string;
};

export const addTeacherToCommunity: AuthController<Params> = async (req, res, next) => {
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

		// add teacher to community
		community.teachers.push(teacher);
		await community.save();

		// return updated community
		return res.status(200).send(community);
	} catch (err) {
		console.log(err);
		return next(err);
	}
};
