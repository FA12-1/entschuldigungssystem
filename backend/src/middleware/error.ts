import { NextFunction, Request, Response } from 'express';
import logger from 'tw-logger';
import { ZodError } from 'zod';
import { ApiError } from '../types/error';

/**
 * Middleware to catch all unhandled exceptions
 * @returns Express middleware function
 */
export const errorHandler = () => (err: any, req: Request, res: Response, next: NextFunction) => {
	// API error
	if (err instanceof ApiError) {
		logger.error(err.message);
		return res.status(err.code).send(err.message);
	}

	// validation error
	if (err instanceof ZodError) {
		return res.status(400).send(err.format());
	}

	// any other error
	logger.error('Unhandled exception:');
	console.log(err);
	return res.status(500).send('Something went wrong.');
};
