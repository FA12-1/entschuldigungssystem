import { createStudent } from './controllers/students/create-student';
import { Router } from 'express';
import { getApiStatus } from './controllers/api/get-api-status';
import { getCurrentUser } from './controllers/auth/get-current-user';
import { addCommunity } from './controllers/communities/create-community';
import { createTeacherAddToCommunity } from './controllers/communities/teachers/create-add-teacher';
import { deleteCommunity } from './controllers/communities/delete-community';
import { getCommunities } from './controllers/communities/get-communities';
import { updateCommunity } from './controllers/communities/update-community';
import { getStudents } from './controllers/students/get-students';
import { createTeacher } from './controllers/teachers/create-teacher';
import { deleteTeacher } from './controllers/teachers/delete-teacher';
import { getTeacher } from './controllers/teachers/get-teacher';
import { getTeachers } from './controllers/teachers/get-teachers';
import { updateTeacher } from './controllers/teachers/update-teacher';
import { updateTeacherToken } from './controllers/teachers/update-teacher-token';
import { auth } from './middleware/auth';
import { addTeacherToCommunity } from './controllers/communities/teachers/add-teacher';
import { removeTeacherFromCommunity } from './controllers/communities/teachers/remove-teacher';
import { getCommunity } from './controllers/communities/get-community';
import { getStudent } from './controllers/students/get-student';

const api = Router();

// API
api.get('/', getApiStatus);

// auth
api.get('/auth/me', auth('admin', 'teacher', 'student'), getCurrentUser);

// communities
api.get('/communities', auth('admin', 'teacher'), getCommunities);
api.get('/communities/:id', auth('admin', 'teacher'), getCommunity);
api.post('/communities', auth('admin'), addCommunity);
api.put('/communities/:id', auth('admin', 'teacher'), updateCommunity);
api.delete('/communities/:id', auth('admin'), deleteCommunity);
// communities/teachers
api.post('/communities/:id/teachers', auth('admin'), createTeacherAddToCommunity);
api.post('/communities/:id/teachers/:teacherid', auth('admin'), addTeacherToCommunity);
api.delete('/communities/:id/teachers/:teacherid', auth('admin'), removeTeacherFromCommunity);

// teachers
api.get('/teachers', auth('admin'), getTeachers);
api.get('/teachers/:id', auth('admin'), getTeacher);
api.post('/teachers', auth('admin'), createTeacher);
api.patch('/teachers/:id', auth('admin'), updateTeacher);
api.patch('/teachers/:id/token', auth('admin'), updateTeacherToken);
api.delete('/teachers/:id', auth('admin'), deleteTeacher);

// students
api.get('/students', auth('admin', 'teacher'), getStudents);
api.get('/students/:id', auth('admin', 'teacher'), getStudent);
api.post('/students', auth('admin', 'teacher'), createStudent);

export default api;
