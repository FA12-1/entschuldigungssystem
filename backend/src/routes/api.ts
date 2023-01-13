import { Router } from 'express';
import { getApiStatus } from '../controllers/api/get-api-status';

const api = Router();

api.get('/', getApiStatus);

export default api;
