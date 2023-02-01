import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbsenceStatus, AbsenceType } from '.';
import { DBStudent } from './student';

@Entity()
export class DBAbsence extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

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
