import { DBStudent } from '../../models/student';
import { AuthController } from '../../util';

export const getStudents: AuthController = async (req, res, next) => {
	try {
		const students = await DBStudent.find({
			order: { lastName: 'asc', firstName: 'asc' },
		});

		return res.status(200).send(students);
	} catch (err) {
		return next(err);
	}
};
