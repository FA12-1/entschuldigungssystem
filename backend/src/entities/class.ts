import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany } from "typeorm"
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

    @Column()
    private password: string;

    @Column()
    lastUpdated: Date;
}