import { Router } from 'express';
import { addClass } from '../controllers/classes/add-class';
import { getClasses } from '../controllers/classes/get-classes';
import { updateClass } from '../controllers/classes/update-class';

const api = Router();

api.get('/', [], getClasses);
api.post('/', [], addClass);
api.put('/:id', [], updateClass);

export default api;
