import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Periodo{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    periodo:string
}