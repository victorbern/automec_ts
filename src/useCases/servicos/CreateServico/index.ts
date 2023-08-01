import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { CreateServicoController } from "./CreateServicoController";
import { CreateServicoUC } from "./CreateServicoUC";

const mySqlServicosRepository = new MySqlServicosRepository;
const createServicoUC = new CreateServicoUC(mySqlServicosRepository)

const createServicoController = new CreateServicoController(createServicoUC);

export { createServicoUC, createServicoController }