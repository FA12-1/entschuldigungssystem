import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBClass } from './class';

@Entity({ name: 'teacher' })
export class DBTeacher extends BaseEntity {
	@PrimaryGeneratedColumn()
	public readonly id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@ManyToMany(() => DBClass, (x) => x.teachers)
	classes: DBClass[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
