import { MySqlClientesRepository } from "../../repositories/implementations/MySqlClientesRepository";
import { FindClienteController } from "./FindClienteController";
import { FindClienteUC } from "./FindClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findClienteUC = new FindClienteUC(mySqlClientesRepository);

const findClienteController = new FindClienteController(findClienteUC);

export { findClienteUC, findClienteController };