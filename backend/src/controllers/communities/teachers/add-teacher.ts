import { findCommunity, findTeacher } from './../../../util/data';
import { AuthController } from '../../../util';

type Params = {
	id: string;
	teacherid: string;
};

export const addTeacherToCommunity: AuthController<Params> = async (req, res, next) => {
	try {
		const { id, teacherid } = req.params;

		// find community
		const community = await findCommunity({ id, withTeachers: true });

		// find teacher
		const teacher = await findTeacher({
			id: teacherid,
			withCommunities: true,
			withTokens: req.user?.type === 'admin',
		});

		// add teacher to community
		community.teachers.push(teacher);
		await community.save();

		// return updated community
		return res.status(200).send(community);
	} catch (err) {
		return next(err);
	}
};
