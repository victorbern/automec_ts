import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { DelOSDetalhesUC } from "./DelOSDetalhesUC";

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const delOSDetalhesUC = new DelOSDetalhesUC(mySqlOSDetalhesRepository);

export { delOSDetalhesUC }