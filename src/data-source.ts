import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario"
import { Role } from "./entity/Role"
import { Periodo } from "./entity/Periodo"
import { Grupo } from "./entity/Grupo"
import { Asignatura } from "./entity/Asignatura"
import { Calificacion } from "./entity/Calificacion"

export const AppDataSource:DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "sistema-notas-uno",
    synchronize: false,
    logging: false,
    entities: [Grupo, Periodo, Role, Usuario, Asignatura, Calificacion],
    migrations: [],
    subscribers: [],
})
