import { NextFunction, Request, Response } from 'express';
import { DBAdmin } from '../models/admin';

type AuthType = 'admin' | 'teacher' | 'student';

export const auth =
	(types: SingleOrArray<AuthType>) => (req: Request, res: Response, next: NextFunction) => {
		try {
			// get token from header
			const token = req.header('x-auth-token');
			if (!token) {
				return res.status(401).send('Access denied. No token provided');
			}

			asArray(types).forEach((type) => {
				if (type === 'admin') {
					DBAdmin.find({ where: {} });
				}
			});

			// return to next middleware
			return next();
		} catch (err) {
			return res.status(400).send('Invalid token.');
		}
	};
