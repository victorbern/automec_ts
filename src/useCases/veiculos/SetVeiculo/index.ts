import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { SetVeiculoController } from "./SetVeiculoController";
import { SetVeiculoUC } from "./SetVeiculoUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const setVeiculoUC = new SetVeiculoUC(mySqlVeiculosRepository, findCliente);

const setVeiculoController = new SetVeiculoController(setVeiculoUC);

export { setVeiculoUC, setVeiculoController }