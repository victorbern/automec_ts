import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { SetFuncionarioController } from "./SetFuncionarioController";
import { SetFuncionarioUC } from "./SetFuncionarioUC";

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const setFuncionarioUC = new SetFuncionarioUC(mySqlFuncionariosRepository);

const setFuncionarioController = new SetFuncionarioController(setFuncionarioUC);

export { setFuncionarioUC, setFuncionarioController }