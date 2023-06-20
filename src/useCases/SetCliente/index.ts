import { MySqlClientesRepository } from "../../repositories/implementations/MySqlClientesRepository";
import { SetClienteController } from "./SetClienteController";
import { SetClienteUC } from "./SetClienteUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const setClienteUC = new SetClienteUC(mySqlClientesRepository);

const setClienteController = new SetClienteController(setClienteUC);

export { setClienteUC, setClienteController }