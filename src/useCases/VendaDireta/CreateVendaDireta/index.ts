import { MySqlVendaDiretaRepository } from "../../../repositories/implementations/MySqlVendaDiretaRepository";
import { CreateVendaDiretaUC } from "./CreateVendaDiretaUC";

const mySqlVendaDiretaRepository = new MySqlVendaDiretaRepository;
const createVendaDiretaUC = new CreateVendaDiretaUC(mySqlVendaDiretaRepository);

export { createVendaDiretaUC }