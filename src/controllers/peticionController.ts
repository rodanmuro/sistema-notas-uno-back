import { Request, Response } from 'express';
import {peticion} from '../services/peticionService'

export class PeticionController{

    async peticionController(req:Request, res:Response) {
        const prompt:string = req.query.prompt as  string;
        const response = await peticion(prompt);
        res.send(response);
    }

}