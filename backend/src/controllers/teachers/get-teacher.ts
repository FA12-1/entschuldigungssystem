import { DBTeacher } from '../../models/teacher';
import { AuthController } from '../../util';

type Params = { id: string };

export const getTeacher: AuthController<Params> = async (req, res, next) => {
	try {
		const teacher = await DBTeacher.findOne({
			where: { id: req.params.id },
			relations: {
				communities: true,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				communities: {
					id: true,
					name: true,
				},
			},
			order: {
				communities: {
					name: 'asc',
				},
			},
		});

		return res.status(200).send(teacher);
	} catch (err) {
		return next(err);
	}
};
