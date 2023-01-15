import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DBCommunity } from './community';

@Entity()
export class DBTeacher extends BaseEntity {
	public readonly type: 'teacher';

	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column({ unique: true })
	public email: string;

	@Column({ generated: 'uuid', unique: true })
	public token: string;

	@ManyToMany(() => DBCommunity, (x) => x.teachers)
	public communities: DBCommunity[];

	@UpdateDateColumn()
	public updatedAt: Date;
}
