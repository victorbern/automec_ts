import { MySqlVendaDiretaRepository } from "../../../repositories/implementations/MySqlVendaDiretaRepository";
import { FindVendaDiretaBetweenDatesUC } from "./FindVendaDiretaBetweenDatesUC";

const mySqlVendaDiretaRepository = new MySqlVendaDiretaRepository;
const findVendaDiretaBetweenDatesUC = new FindVendaDiretaBetweenDatesUC(mySqlVendaDiretaRepository);

export { findVendaDiretaBetweenDatesUC }