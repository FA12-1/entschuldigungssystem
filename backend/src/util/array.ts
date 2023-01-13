export type SingleOrArray<T> = T | T[];

export const asArray = <T>(value: SingleOrArray<T>): T[] => {
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};
