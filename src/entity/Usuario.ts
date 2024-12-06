import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { Role } from './Role';
import { Grupo } from './Grupo';
import { Asignatura } from './Asignatura';

@Entity()
export class Usuario{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombres:string

    @Column()
    apellidos:string 

    @Column()
    correo:string 

    @ManyToMany(()=>Role)
    @JoinTable({name:"usuario_roles"})
    roles:Role[]

    @ManyToMany(()=>Grupo)
    @JoinTable({name:"usuario_grupos"})
    grupos:Grupo[]

    @ManyToMany(()=>Asignatura)
    @JoinTable({name:"usuario_asignaturas"})
    asignaturas:Asignatura[]
}

