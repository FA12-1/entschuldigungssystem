import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne } from "typeorm"
import { DBUser } from "./user";


@Entity()
export class DBToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => DBUser, (user) => user.tokens)
    user: DBUser;

    @Column()
    validUntil: Date;
}