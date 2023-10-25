import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { DelServicoController } from "./DelServicoController";
import { DelServicoUC } from "./DelServicoUC";

const mySqlServicosRepository = new MySqlServicosRepository;
const delServicoUC = new DelServicoUC(mySqlServicosRepository);

const delServicoController = new DelServicoController(delServicoUC);

export { delServicoUC, delServicoController }