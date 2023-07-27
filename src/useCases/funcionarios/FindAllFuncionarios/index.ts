import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { FindAllFuncionariosController } from "./FindAllFuncionariosController";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const findAllFuncionariosUC = new FindAllFuncionariosUC(mySqlFuncionariosRepository);

const findAllFuncionariosController = new FindAllFuncionariosController(findAllFuncionariosUC);

export { findAllFuncionariosUC, findAllFuncionariosController }