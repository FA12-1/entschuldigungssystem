import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DBProffessor } from "./professor";
import { DBStudent } from "./student";

@Entity()
export class DBClass extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    /** The name of the Class */
    name: string;

    @ManyToMany(() => DBProffessor, (prof) => prof.classes)
    /** The professors of the class */
    professors: DBProffessor[];

    @OneToMany(() => DBStudent, (student) => student.class)
    students: DBStudent[];

    // todo jan, warum hat eine klasse ein passwort?
    @Column()
    private password: string;

    @Column()
    lastUpdated: Date;
}