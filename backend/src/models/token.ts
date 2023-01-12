import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TokenType } from '../types/token';

@Entity({ name: 'token' })
export class DBToken extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public token: string;

	@Column()
	public type: TokenType;

	@CreateDateColumn()
	public createdAt: Date;
}
