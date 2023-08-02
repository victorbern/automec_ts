import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { CreateVeiculoController } from "./CreateVeiculoController";
import { CreateVeiculoUC } from "./CreateVeiculoUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository;

const createVeiculoUC = new CreateVeiculoUC(mySqlVeiculosRepository, findCliente);
const createVeiculoController = new CreateVeiculoController(createVeiculoUC);

export { createVeiculoUC, createVeiculoController}