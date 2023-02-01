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
	@JoinTable({
		name: 'community_teacher',
		joinColumn: {
			name: 'community',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'teacher',
			referencedColumnName: 'id',
		},
	})
	teachers: DBTeacher[];

	@OneToMany(() => DBStudent, (x) => x.community)
	public students: DBStudent[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
