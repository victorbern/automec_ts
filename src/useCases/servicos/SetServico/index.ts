import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { SetServicoControlller } from "./SetServicoController";
import { SetServicoUC } from "./SetServicoUC";

const mySqlServicosRepository = new MySqlServicosRepository;
const setServicoUC = new SetServicoUC(mySqlServicosRepository);

const setServicoController = new SetServicoControlller(setServicoUC);

export { setServicoUC, setServicoController }