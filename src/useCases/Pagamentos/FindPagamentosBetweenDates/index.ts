import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { FindPagamentosBetweenDatesUC } from "./FindPagamentosBetweenDatesUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;
const findPagamentosBetweenDatesUC = new FindPagamentosBetweenDatesUC(mySqlPagamentosRepository);

export { findPagamentosBetweenDatesUC }