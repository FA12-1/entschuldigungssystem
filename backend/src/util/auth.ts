import bcrypt from 'bcrypt';
import logger from 'tw-logger';

/**
 * Encrypt password
 * @param {string} input Password to encrypt
 * @returns {string} Encrypted password
 */
export function encryptPassword(input: string): string {
	try {
		const salt = bcrypt.genSaltSync(12);
		const password = bcrypt.hashSync(input, salt);
		return password;
	} catch (err) {
		logger.error('Hashing password failed');
		logger.error((err as Error).message);
		throw new Error('Hashing password failed');
	}
}

/**
 * Test password against a hash
 * @param {string} password Password to compare
 * @param {string} hash Hash to test against
 * @returns {boolean} true if matching, otherwise false
 */
export function checkPassword(password: string, hash: string): boolean {
	try {
		const passwordMatch = bcrypt.compareSync(password, hash);
		return passwordMatch;
	} catch (err) {
		logger.error('Error checking password');
		logger.error((err as Error).message);
		return false;
	}
}
