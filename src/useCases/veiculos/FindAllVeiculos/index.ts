import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindAllVeiculosController } from "./FindAllVeiculosController";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findAllVeiculosUC = new FindAllVeiculosUC(mySqlVeiculosRepository);

const findAllVeiculosController = new FindAllVeiculosController(findAllVeiculosUC);

export { findAllVeiculosUC, findAllVeiculosController }