import { validate } from 'uuid';
import { ApiError } from '../types/error';

export const checkUuid = (value: string) => {
	if (!validate(value)) {
		throw new ApiError(400, 'Invalid UUID');
	}
};
