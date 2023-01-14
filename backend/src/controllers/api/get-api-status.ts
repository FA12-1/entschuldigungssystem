import pjson from '../../../package.json';
import { Controller } from '../../util';

export const getApiStatus: Controller = (_req, res) => {
	const { name, version } = pjson;

	return res.status(200).send({
		api: 'online',
		name,
		version,
	});
};
