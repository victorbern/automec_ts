import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { FindAllServicosController } from "./FindAllServicosController";
import { FindAllServicosUC } from "./FindAllServicosUC";

const mySqlServicosRepository = new MySqlServicosRepository;
const findAllServicosUC = new FindAllServicosUC(mySqlServicosRepository);

const findAllServicosController = new FindAllServicosController(findAllServicosUC);

export { findAllServicosUC, findAllServicosController }