import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, PrimaryColumn } from "typeorm"


@Entity()
export class DBOption extends BaseEntity {
    @Column()
    name: string;

    @Column()
    type: "SYSTEM" | "API";

    @Column()
    apiName: string;

    @Column()
    currentValue: string | number;

    @Column()
    valueType: "number" | "string";

    @Column()
    defaultValue: string | number;

    @Column()
    lastValueChange: Date;
}