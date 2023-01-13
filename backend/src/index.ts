import http from 'http';
import app from './app';
import { datasource } from './config/db';
import { ENV } from './config/env';
import { createInitialAdminAccount, normalizePort } from './util/start';

const port = normalizePort(ENV.PORT);
app.set('port', port);

// create HTTP server
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Function to set up additional stuff.
 * This function gets executed as soon as the server is listening.
 */
async function setup() {
	try {
		await datasource.initialize();
		await createInitialAdminAccount();
	} catch (err) {
		console.error('Error initializing database');
		console.error(err);
	}
}

/**
 * Event listener for HTTP server "error" event
 * @param {any} err Error
 */
function onError(err: any) {
	if (err.syscall !== 'listen') {
		throw err;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (err.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
		default:
			throw err;
	}
}

/**
 * Event listener for HTTP server "listening" event
 */
async function onListening() {
	const address = server.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;

	console.log(`Listening on ${bind}...`);

	setup();
}
