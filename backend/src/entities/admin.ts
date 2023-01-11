import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"

@Entity()
export class DBAdmin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    /** The name of the Admin */
    name: string;

    @Column()
    /** The email-Adress of the Admin */
    email: string;

    @Column()
    password: string;

    @Column()
    lastUpdated: Date;
}