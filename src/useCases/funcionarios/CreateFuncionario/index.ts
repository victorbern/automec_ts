import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { CreateFuncionarioController } from "./CreateFuncionarioController";
import { CreateFuncionarioUC } from "./CreateFuncionarioUC";

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const createFuncionarioUC = new CreateFuncionarioUC(mySqlFuncionariosRepository);

const createFuncionarioController = new CreateFuncionarioController(createFuncionarioUC);

export { createFuncionarioUC, createFuncionarioController }