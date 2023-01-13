import { Request, Response } from 'express';
import pjson from '../../../package.json';

export function getApiStatus(_req: Request, res: Response) {
	const { name, version } = pjson;

	return res.status(200).send({
		api: 'online',
		name,
		version,
	});
}
