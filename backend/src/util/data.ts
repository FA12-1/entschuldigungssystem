import { FindOneOptions } from 'typeorm';
import { checkUuid } from '.';
import { DBCommunity } from '../models/community';
import { DBStudent } from '../models/student';
import { DBTeacher } from '../models/teacher';
import { ApiError } from '../types/error';

type FindCommunityProps = {
	id: string;
	withTeachers?: boolean;
	withStudents?: boolean;
	withTokens?: boolean;
};
export const findCommunity = async (
	props: FindCommunityProps,
	options?: FindOneOptions<DBCommunity>
): Promise<DBCommunity> => {
	const { id, withTeachers, withStudents, withTokens } = props;
	checkUuid(id);

	const community = await DBCommunity.findOne({
		where: { id, ...options?.where },
		relations: {
			teachers: withTeachers,
			students: withStudents,
			...options?.relations,
		},
		select: {
			teachers: withTeachers
				? {
						id: true,
						firstName: true,
						lastName: true,
						token: withTokens,
				  }
				: false,
			students: withStudents
				? {
						id: true,
						firstName: true,
						lastName: true,
						token: withTokens,
				  }
				: false,
			...options?.select,
		},
		order: {
			teachers: withTeachers ? { lastName: 'asc', firstName: 'asc' } : undefined,
			students: withTeachers ? { lastName: 'asc', firstName: 'asc' } : undefined,
			...options?.order,
		},
		...options,
	});

	if (!community) {
		throw new ApiError(404, `Community with ID '${id}' does not exist.`);
	}

	return community;
};

type FindTeacherProps = {
	id: string;
	withCommunities?: boolean;
	withTokens?: boolean;
};
export const findTeacher = async (
	props: FindTeacherProps,
	options?: FindOneOptions<DBTeacher>
): Promise<DBTeacher> => {
	const { id, withCommunities, withTokens } = props;
	checkUuid(id);

	const teacher = await DBTeacher.findOne({
		where: { id, ...options?.where },
		relations: {
			communities: withCommunities,
			...options?.relations,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			token: withTokens,
			communities: withCommunities
				? {
						id: true,
						name: true,
				  }
				: false,
			...options?.select,
		},
		order: {
			lastName: 'asc',
			firstName: 'asc',
			communities: withCommunities ? { name: 'asc' } : undefined,
			...options?.order,
		},
		...options,
	});

	if (!teacher) {
		throw new ApiError(404, `Teacher with ID '${id}' does not exist.`);
	}

	return teacher;
};

type FindStudentProps = {
	id: string;
	withCommunity?: boolean;
	withAbsences?: boolean;
	withToken?: boolean;
};
export const findStudent = async (
	props: FindStudentProps,
	options?: FindOneOptions<DBStudent>
): Promise<DBStudent> => {
	const { id, withCommunity, withAbsences, withToken } = props;
	checkUuid(id);

	const student = await DBStudent.findOne({
		where: { id, ...options?.where },
		relations: {
			community: withCommunity,
			absences: withAbsences,
			...options?.relations,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			birthday: true,
			token: withToken,
			community: withCommunity
				? {
						id: true,
						name: true,
				  }
				: undefined,
			absences: withAbsences
				? {
						id: true,
						startDate: true,
						endDate: true,
						type: true,
						status: true,
				  }
				: false,
			...options?.select,
		},
		order: { lastName: 'asc', firstName: 'asc', ...options?.order },
		...options,
	});

	if (!student) {
		throw new ApiError(404, `Student with ID '${id}' does not exist.`);
	}

	return student;
};
