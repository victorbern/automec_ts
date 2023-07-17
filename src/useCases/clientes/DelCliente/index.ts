import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const delClienteUC = new DelClienteUC(mySqlClientesRepository);

const delClienteController = new DelClienteController(delClienteUC);

export { delClienteUC, delClienteController }