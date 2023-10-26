import { MySqlVendaDiretaRepository } from "../../../repositories/implementations/MySqlVendaDiretaRepository";
import { DelVendaDiretaUC } from "./DelVendaDiretaUC";

const mySqlVendaDiretaRepository = new MySqlVendaDiretaRepository;
const delVendaDiretaUC = new DelVendaDiretaUC(mySqlVendaDiretaRepository);

export { delVendaDiretaUC }