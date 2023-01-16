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
	public name: string;

	@Column()
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
