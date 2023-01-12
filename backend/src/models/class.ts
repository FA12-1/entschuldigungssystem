import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBStudent } from './student';
import { DBTeacher } from './teacher';

@Entity({ name: 'class' })
export class DBClass extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column({ unique: true })
	public name: string;

	@ManyToMany(() => DBTeacher, (x) => x.classes)
	teachers: DBTeacher[];

	@OneToMany(() => DBStudent, (x) => x.class)
	public students: DBStudent[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
