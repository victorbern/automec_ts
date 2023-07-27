import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindVeiculoController } from "./FindVeiculoController";
import { FindVeiculoUC } from "./FindVeiculoUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculoUC = new FindVeiculoUC(mySqlVeiculosRepository, findCliente);

const findVeiculoController = new FindVeiculoController(findVeiculoUC);

export { findVeiculoUC, findVeiculoController }