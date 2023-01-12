import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes';
import httpLogger from 'tw-express-http-logger';
import { errorHandler } from './middleware/error';

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

// serve API
app.use('/api', apiRoutes);

app.use(errorHandler());

export default app;
