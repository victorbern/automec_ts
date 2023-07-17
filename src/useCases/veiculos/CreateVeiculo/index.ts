import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { CreateVeiculoController } from "./CreateVeiculoController";
import { CreateVeiculoUC } from "./CreateVeiculoUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const createVeiculoUC = new CreateVeiculoUC(mySqlVeiculosRepository);

const createVeiculoController = new CreateVeiculoController(createVeiculoUC);

export { createVeiculoUC, createVeiculoController}