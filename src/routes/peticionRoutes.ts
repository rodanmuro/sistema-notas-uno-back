import {Request, Response, Router} from 'express';
import { PeticionController } from '../controllers/peticionController';

export const router = Router();

const peticionController  = new PeticionController();

router.get("/peticion", (req:Request, res:Response) => {
    peticionController.peticionController(req,res);
})

