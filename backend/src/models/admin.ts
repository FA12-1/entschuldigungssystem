import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class DBAdmin extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@Column()
	public name: string;

	@Column({ unique: true })
	public email: string;

	@Column()
	public password: string;

	@UpdateDateColumn()
	public updatedAt: Date;
}
