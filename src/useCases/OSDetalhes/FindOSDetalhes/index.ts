import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { FindOSDetalhesUC } from "./FindOSDetalhesUC";

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const findOSDetalhesUC = new FindOSDetalhesUC(mySqlOSDetalhesRepository);

export { findOSDetalhesUC }