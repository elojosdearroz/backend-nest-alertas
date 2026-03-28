import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    first_name: string
    
    @Column()
    last_name: string

    @Column()
    phone: string

    @Column()
    password: string
}