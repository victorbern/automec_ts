import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { DelFuncionarioController } from "./DelFuncionarioController";
import { DelFuncionarioUC } from "./DelFuncionarioUC";

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const delFuncionarioUC = new DelFuncionarioUC(mySqlFuncionariosRepository);

const delFuncionarioController = new DelFuncionarioController(delFuncionarioUC);

export { delFuncionarioUC, delFuncionarioController }