import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { CreateServicoUC } from "../CreateServico/CreateServicoUC";
import { FindServicoController } from "./FindServicoController";
import { FindServicoUC } from "./FindServicoUC";

const mySqlServicosRepository = new MySqlServicosRepository;
const findServicoUC = new FindServicoUC(mySqlServicosRepository);

const findServicoController = new FindServicoController(findServicoUC);

export { findServicoUC, findServicoController }