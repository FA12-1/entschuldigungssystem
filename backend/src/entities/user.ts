import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import * as bcrypt from 'bcrypt'
import { DBToken } from "./token"

@Entity()
export class DBUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    permissions: PermissionNames;

    @Function()
    tryAuthenticate = (password: string) => {
        return bcrypt.compareSync(password, this.password);
    }

    @OneToMany(() => DBToken, (token) => token.user)
    tokens: DBToken[];
}