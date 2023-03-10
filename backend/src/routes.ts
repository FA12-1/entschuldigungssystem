import { Router } from 'express';
import { getApiStatus } from './controllers/api/get-api-status';
import { addCommunity } from './controllers/communities/add-community';
import { createAndAddTeacherToCommunity } from './controllers/communities/create-add-teacher';
import { deleteCommunity } from './controllers/communities/delete-community';
import { getCommunities } from './controllers/communities/get-communities';
import { updateCommunity } from './controllers/communities/update-community';
import { createTeacher } from './controllers/teachers/create-teacher';
import { deleteTeacher } from './controllers/teachers/delete-teacher';
import { getTeacher } from './controllers/teachers/get-teacher';
import { getTeachers } from './controllers/teachers/get-teachers';
import { updateTeacher } from './controllers/teachers/update-teacher';
import { updateTeacherToken } from './controllers/teachers/update-teacher-token';
import { auth } from './middleware/auth';

const api = Router();

// API
api.get('/', getApiStatus);
// communities
api.get('/communities', auth('admin', 'teacher'), getCommunities);
api.post('/communities', auth('admin'), addCommunity);
api.put('/communities/:id', auth('admin', 'teacher'), updateCommunity);
api.delete('/communities/:id', auth('admin'), deleteCommunity);
api.post('/communities/:id/teachers', auth('admin'), createAndAddTeacherToCommunity);
// teachers
api.get('/teachers', auth('admin'), getTeachers);
api.get('/teachers/:id', auth('admin'), getTeacher);
api.post('/teachers', auth('admin'), createTeacher);
api.patch('/teachers/:id', auth('admin'), updateTeacher);
api.patch('/teachers/:id/token', auth('admin'), updateTeacherToken);
api.delete('/teachers/:id', auth('admin'), deleteTeacher);

export default api;
