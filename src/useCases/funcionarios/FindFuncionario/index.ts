import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { FindFuncionarioController } from "./FindFuncionarioController";
import { FindFuncionarioUC } from "./FindFuncionarioUC";

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const findFuncionarioUC = new FindFuncionarioUC(mySqlFuncionariosRepository);

const findFuncionarioController = new FindFuncionarioController(findFuncionarioUC);

export { findFuncionarioUC, findFuncionarioController }