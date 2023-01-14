import { ENV } from '../config/env';
import { DBAdmin } from '../models/admin';

/**
 * Normalize a port into a number, string of false
 * @param {string} value The port
 */
export function normalizePort(value: string): number | string | false {
	const port = parseInt(value, 10);

	// check if port is a number
	if (isNaN(port)) {
		// named pipe
		return value;
	}

	// check if port is a valid number
	if (port >= 0) {
		return port;
	}

	// fallback
	return false;
}

export async function createInitialAdminAccount() {
	// check if admin account already exists
	const admin = await DBAdmin.findOne({ where: { email: ENV.ADMIN_EMAIL } });
	if (!admin) {
		const newAdmin = DBAdmin.create({
			firstName: ENV.ADMIN_FIRSTNAME,
			lastName: ENV.ADMIN_LASTNAME,
			email: ENV.ADMIN_EMAIL,
			token: ENV.ADMIN_TOKEN,
		});
		await newAdmin.save();
	}
}
