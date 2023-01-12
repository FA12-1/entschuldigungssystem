import { Router } from 'express';
import { addClass } from '../controllers/classes/add-class';
import { getClasses } from '../controllers/classes/get-classes';

const api = Router();

api.get('/', [], getClasses);
api.post('/', [], addClass);

export default api;
