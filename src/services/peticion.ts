import 'dotenv/config';
import OpenAI from "openai";
import * as fs from "fs";

const cliente = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY
    }
);

const asignaturaEntity = fs.readFileSync("src/entity/Asignatura.ts");
const calificacionEntity = fs.readFileSync("src/entity/Calificacion.ts");
const grupoEntity = fs.readFileSync("src/entity/Grupo.ts");
const periodoEntity = fs.readFileSync("src/entity/Periodo.ts");
const roleEntity = fs.readFileSync("src/entity/Role.ts");
const usuarioEntity = fs.readFileSync("src/entity/Usuario.ts");

const allEntitiesFilesContent = asignaturaEntity + " "
    + calificacionEntity + " "
    + grupoEntity + " "
    + periodoEntity + " "
    + roleEntity + " "
    + usuarioEntity;


export async function peticion(mensaje:string):Promise<string>{

    const response = await cliente.chat.completions.create(
        {
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "these are the entities in typescript using typeorm of system grades " 
                    + allEntitiesFilesContent
                    + ". You are an asisstant that creates sql queries, and for every request of the query "
                    + " you have only return the sql query; "
                    + " is impportant to know that the name of every table is in lowercase otherwise, we will have sql syntax errors. "
                    + " is important to know that the name of the columns are in camel case, for example usuarioId"
                    + "dont use Quotation Marks for the name of fields or tables"
                },
                {
                    role: "user",
                    content: mensaje 
                    + ". Is important only return the sql query. "
                    + " Is impportant to know that the name of every table is in lowercase otherwise, we will have sql syntax errors" 
                    + " is important to know that the name of the columns are in camel case, for example usuarioId "
                    + "dont use Quotation Marks for the name of fields or tables"
                }
            ]
        }
    );



    console.log(response)

    console.log("----- query de respuesta -----")
    const query = response.choices[0].message.content
    console.log(query);

    return query as string;

}