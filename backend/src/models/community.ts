import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBStudent } from './student';
import { DBTeacher } from './teacher';

@Entity()
export class DBCommunity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column({ unique: true })
	public name: string;

	@ManyToMany(() => DBTeacher, (x) => x.communities)
	@JoinTable()
	teachers: DBTeacher[];

	@OneToMany(() => DBStudent, (x) => x.community)
	public students: DBStudent[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
