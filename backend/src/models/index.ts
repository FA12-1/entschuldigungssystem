import { DBAbsence } from './absence';
import { DBAdmin } from './admin';
import { DBCommunity } from './community';
import { DBStudent } from './student';
import { DBTeacher } from './teacher';

export type User = DBAdmin | DBTeacher | DBStudent;

export const entities = [DBAbsence, DBAdmin, DBCommunity, DBStudent, DBTeacher];
