import { MySqlVendaDiretaRepository } from "../../../repositories/implementations/MySqlVendaDiretaRepository";
import { FindVendaDiretaUC } from "./FindVendaDiretaUC";

const mySqlVendaDiretaRepository = new MySqlVendaDiretaRepository;
const findVendaDiretaUC = new FindVendaDiretaUC(mySqlVendaDiretaRepository);

export { findVendaDiretaUC }