import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { DBAbsence } from "./absence";
import { DBClass } from "./class";

@Entity()
export class DBStudent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid')
    private token: string;

    @Column()
    name: string;

    @Column()
    birthDate: Date;

    @Column()
    email: string;

    @ManyToOne(() => DBClass, (dbclass) => dbclass.students)
    class: DBClass;

    @OneToMany(() => DBAbsence, (dbabsence) => dbabsence.student)
    absences: DBAbsence[];

    @Column()
    lastUpdated: Date;
}