import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBCommunity } from './community';

@Entity()
export class DBTeacher extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column()
	public name: string;

	@Column({ unique: true })
	public email: string;

	@Column({ generated: 'uuid', unique: true })
	public token: string;

	@ManyToMany(() => DBCommunity, (x) => x.teachers)
	@JoinTable()
	public communities: DBCommunity[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
