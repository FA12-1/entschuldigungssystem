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
import { DBCommunity } from './community';

@Entity()
export class DBStudent extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column({ generated: 'uuid', unique: true })
	public token: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column({ type: 'date' })
	public birthday: Date;

	@Column({ unique: true })
	public email: string;

	@ManyToOne(() => DBCommunity, (x) => x.students)
	public community: DBCommunity;

	@OneToMany(() => DBAbsence, (x) => x.student)
	public absences: DBAbsence[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
