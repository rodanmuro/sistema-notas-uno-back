import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class Grupo{

    @PrimaryGeneratedColumn()
    id:number 

    @Column()
    grupo:string

}