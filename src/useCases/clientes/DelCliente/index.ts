import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { findVeiculoByClienteUC } from "../../veiculos/FindVeiculoByCliente";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const delClienteUC = new DelClienteUC(mySqlClientesRepository, findVeiculoByClienteUC);

const delClienteController = new DelClienteController(delClienteUC);

export { delClienteUC, delClienteController }