import express from 'express';
import apiRoutes from './api';

const api = express.Router();

api.use('/', apiRoutes);

export default api;
