import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, ManyToOne } from "typeorm"
import { DBStudent } from "./student";

@Entity()
export class DBAbsence extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    status: 'SUBMITTED' | 'PROOF_SUBMITTED' | 'ACCEPTED';

    @Column()
    type: 'SICK';

    @ManyToOne(() => DBStudent, (student) => student.absences)
    student: DBStudent;
}