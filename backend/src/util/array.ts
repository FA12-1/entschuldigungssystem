type SingleOrArray<T> = T | T[];

const asArray = <T>(value: SingleOrArray<T>) => {
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};
