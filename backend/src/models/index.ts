import { DBAbsence } from './absence';
import { DBAdmin } from './admin';
import { DBCommunity } from './community';
import { DBStudent } from './student';
import { DBTeacher } from './teacher';

export const entities = [DBAbsence, DBAdmin, DBCommunity, DBStudent, DBTeacher];

export type User = DBAdmin | DBTeacher | DBStudent;

export type AbsenceStatus = 'submitted' | 'proof-submitted' | 'accepted';

export type AbsenceType = 'illness' | 'suspension';
