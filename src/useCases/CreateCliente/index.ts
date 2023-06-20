import { MySqlClientesRepository } from "../../repositories/implementations/MySqlClientesRepository";
import { CreateClienteController } from "./CreateClienteController";
import { CreateClienteUC } from "./CreateClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const createClienteUC = new CreateClienteUC(mySqlClientesRepository);

const createClienteController = new CreateClienteController(createClienteUC);

export { createClienteUC, createClienteController }