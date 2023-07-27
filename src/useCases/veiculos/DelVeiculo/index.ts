import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { DelVeiculoController } from "./DelVeiculoController";
import { DelVeiculoUC } from "./DelVeiculoUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const delVeiculoUC = new DelVeiculoUC(mySqlVeiculosRepository);

const delVeiculoController = new DelVeiculoController(delVeiculoUC);

export { delVeiculoUC, delVeiculoController }