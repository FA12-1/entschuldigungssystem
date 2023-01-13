import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DBAdmin extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column()
	public name: string;

	@Column({ unique: true })
	public email: string;

	@Column({ generated: 'uuid', unique: true })
	public token: string;

	@UpdateDateColumn()
	public updatedAt: Date;
}
