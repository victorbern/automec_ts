import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindVeiculoByClienteUC } from "../../veiculos/FindVeiculoByCliente/FindVeiculoByClienteUC";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculoByCliente = new FindVeiculoByClienteUC(mySqlVeiculosRepository);
const delClienteUC = new DelClienteUC(mySqlClientesRepository, findVeiculoByCliente);

const delClienteController = new DelClienteController(delClienteUC);

export { delClienteUC, delClienteController }