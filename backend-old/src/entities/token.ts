import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { DBAbsence } from "./absence";
import { DBClass } from "./class";

@Entity()
export class DBToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: 'ADMIN' | 'PROFESSOR';

    @Column()
    typeId: number;

    @Column()
    createdAt: Date;
}