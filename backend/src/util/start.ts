import { ENV } from '../config/env';
import { DBAdmin } from '../models/admin';
import { encryptPassword } from './auth';

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
		const newAdmin = await DBAdmin.create({
			name: 'Admin',
			email: ENV.ADMIN_EMAIL,
			password: encryptPassword(ENV.ADMIN_PASSWORD),
		});
		newAdmin.save();
	}
}
