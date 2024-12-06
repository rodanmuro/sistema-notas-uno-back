import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario";
import { peticion } from "./services/peticion";

const iniciarDB = async () => {
  await AppDataSource.initialize();
}

iniciarDB();


const peticionBase = async () => {
    const query = await peticion("que profesores dictan la asignatura de mathematics ");  
    const result = await AppDataSource.query(query);

    result.forEach(
        (usuario:Usuario, index:number) => {
          console.log(usuario.apellidos+" "+usuario.nombres);
        }
    )
}

peticionBase();

