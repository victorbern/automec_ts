import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindAllVeiculosController } from "./FindAllVeiculosController";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository)

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findAllVeiculosUC = new FindAllVeiculosUC(mySqlVeiculosRepository, findCliente);

const findAllVeiculosController = new FindAllVeiculosController(findAllVeiculosUC);

export { findAllVeiculosUC, findAllVeiculosController }