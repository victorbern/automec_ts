import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindVeiculoController } from "./FindVeiculoController";
import { FindVeiculoUC } from "./FindVeiculoUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculoUC = new FindVeiculoUC(mySqlVeiculosRepository);

const findVeiculoController = new FindVeiculoController(findVeiculoUC);

export { findVeiculoUC, findVeiculoController }