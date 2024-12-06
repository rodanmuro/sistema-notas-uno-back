import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Asignatura } from "./Asignatura";
import { Periodo } from "./Periodo";

@Entity()
export class Calificacion{

    @PrimaryGeneratedColumn()
    id:number 

    @ManyToOne(()=>Usuario)
    @JoinColumn({name:"idDocente"})
    idDocente:number 
    
    @ManyToOne(()=>Usuario)
    @JoinColumn({name:"idEstudiante"})
    idEstudiante:number

    @ManyToOne(()=>Asignatura)
    @JoinColumn({name:"idAsignatura"})
    idAsignatura:number 

    @Column()
    year:number 

    @ManyToOne(()=>Periodo)
    @JoinColumn({name:"idPeriodo"})
    idPeriodo:number
    
    @Column()
    calificacion:number

}