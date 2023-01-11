import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany } from "typeorm"
import { DBClass } from "./class";

@Entity()
export class DBProffessor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    /** The name of the Professor */
    name: string;

    @Column()
    /** The email-Adress of the Professor */
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => DBClass, (dbclass) => dbclass.professors)
    classes: DBClass[];

    @Column()
    lastUpdated: Date;
}