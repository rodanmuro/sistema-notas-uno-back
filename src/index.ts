import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario";
import { router } from "./routes/peticionRoutes";
import { peticion } from "./services/peticionService";
import * as express from "express";

const app = express();

app.use(router);

app.listen(3000, () => {
  console.log("escuchando");
})


