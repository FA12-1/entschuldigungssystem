import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbsenceStatus, AbsenceType } from '../types/absence';
import { DBStudent } from './student';

@Entity({ name: 'absence' })
export class DBAbsence extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly uid: string;

	@Column()
	public startDate: Date;

	@Column()
	public endDate: Date;

	@Column()
	public status: AbsenceStatus;

	@Column()
	public type: AbsenceType;

	@ManyToOne(() => DBStudent, (x) => x.absences)
	public student: DBStudent;
}
