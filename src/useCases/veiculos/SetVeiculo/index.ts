import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { SetVeiculoController } from "./SetVeiculoController";
import { SetVeiculoUC } from "./SetVeiculoUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const setVeiculoUC = new SetVeiculoUC(mySqlVeiculosRepository);

const setVeiculoController = new SetVeiculoController(setVeiculoUC);

export { setVeiculoUC, setVeiculoController }