import express from 'express';
import apiRoutes from './api';
import classesRoutes from './classes';

const api = express.Router();

api.use('/', apiRoutes);
api.use('/classes', classesRoutes);

export default api;
