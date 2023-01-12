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
