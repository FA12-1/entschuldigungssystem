import { DBAbsence } from './absence';
import { DBAdmin } from './admin';
import { DBClass } from './class';
import { DBStudent } from './student';
import { DBTeacher } from './teacher';

export type User = DBAdmin | DBTeacher | DBStudent;

export const entities = [DBAbsence, DBAdmin, DBClass, DBStudent, DBTeacher];
