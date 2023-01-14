import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes';
import httpLogger from 'tw-express-http-logger';
import { errorHandler } from './middleware/error';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { SwaggerTheme } from 'swagger-themes';
const theme = new SwaggerTheme('v3');

// create express application
const app: express.Application = express();

// remove x-powered-by
app.disable('x-powered-by');

// middleware
app.use(cors()); //FIXME add config
app.use(httpLogger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, {
		explorer: true,
		customCss: theme.getBuffer('material'),
	})
);

// serve API
app.use('/api', apiRoutes);

app.use(errorHandler());

export default app;
