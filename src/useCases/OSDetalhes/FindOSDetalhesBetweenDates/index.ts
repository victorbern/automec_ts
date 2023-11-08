import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { FindOSDetalhesBetweenDatesUC } from "./FindOSDetalhesBetweenDatesUC";

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const findOSDetalhesBetweenDatesUC = new FindOSDetalhesBetweenDatesUC(mySqlOSDetalhesRepository);

export { findOSDetalhesBetweenDatesUC }