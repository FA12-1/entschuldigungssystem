import { User } from '../models';
import { DBAdmin } from '../models/admin';
import { DBStudent } from '../models/student';
import { DBTeacher } from '../models/teacher';

export type AuthType = 'admin' | 'teacher' | 'student';

export async function findUserByToken(token: string, type?: AuthType): Promise<User | null> {
	if (type === 'admin') {
		return await DBAdmin.findOneBy({ token });
	} else if (type === 'teacher') {
		return await DBTeacher.findOneBy({ token });
	} else if (type === 'student') {
		return await DBStudent.findOneBy({ token });
	}

	return null;
}
