import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { FindAllClientesController } from "./FindAllClientesController";
import { FindAllClientesUC } from "./FindAllClientesUC";

const mySqlClientesRepository = new MySqlClientesRepository;
const findAllClientesUC = new FindAllClientesUC(mySqlClientesRepository);

const findAllClientesController = new FindAllClientesController(findAllClientesUC);

export { findAllClientesUC, findAllClientesController };