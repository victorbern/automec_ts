import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { CreateOSDetalhesUC } from "./CreateOSDetalhesUC";

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const createOSDetalhesUC = new CreateOSDetalhesUC(mySqlOSDetalhesRepository);

export { createOSDetalhesUC }