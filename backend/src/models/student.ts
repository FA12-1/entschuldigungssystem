import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBAbsence } from './absence';
import { DBClass } from './class';
import { DBToken } from './token';

@Entity({ name: 'student' })
export class DBStudent extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@OneToOne(() => DBToken)
	public token: DBToken;

	@Column()
	public name: string;

	@Column()
	public birthday: Date;

	@Column()
	public email: string;

	@ManyToOne(() => DBClass, (x) => x.students)
	public class: DBClass;

	@OneToMany(() => DBAbsence, (x) => x.student)
	public absences: DBAbsence[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
