import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBAbsence } from './absence';
import { DBClass } from './class';

@Entity({ name: 'student' })
export class DBStudent extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column({ generated: 'uuid', unique: true })
	public token: string;

	@Column()
	public name: string;

	@Column()
	public birthday: Date;

	@Column({ unique: true })
	public email: string;

	@ManyToOne(() => DBClass, (x) => x.students)
	public class: DBClass;

	@OneToMany(() => DBAbsence, (x) => x.student)
	public absences: DBAbsence[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
