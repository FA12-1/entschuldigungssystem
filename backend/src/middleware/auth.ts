import { NextFunction, Response } from 'express';
import { AuthRequest } from '../util';
import { AuthType, findUserByToken } from '../util/auth';

export const auth =
	(...types: AuthType[]) =>
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			// get token from header
			const token = req.header('Authorization')?.replace('Bearer', '').trim();

			if (!token) {
				return res.status(401).send('Access denied. No token provided');
			}

			// check if token is valid for one of the user types
			let authenticated = false;
			await Promise.all(
				types.map(async (type) => {
					const user = await findUserByToken(token, type);
					if (user !== null) {
						authenticated = true;
						req.user = user;
					}
				})
			);

			if (!authenticated) {
				return res.status(401).send('Unauthorized');
			}

			// return to next middleware
			return next();
		} catch (err) {
			return res.status(400).send('Invalid token');
		}
	};
