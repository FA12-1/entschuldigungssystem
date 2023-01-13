import { Router } from 'express';
import { getApiStatus } from './controllers/api/get-api-status';
import { addClass } from './controllers/classes/add-class';
import { getClasses } from './controllers/classes/get-classes';
import { updateClass } from './controllers/classes/update-class';
import { auth } from './middleware/auth';

const api = Router();

// API
api.get('/', getApiStatus);
// Classes
api.get('/classes', auth(['admin', 'teacher']), getClasses);
api.post('/classes', auth(['admin', 'teacher']), addClass);
api.put('/classes/:id', auth(['admin', 'teacher']), updateClass);

export default api;
