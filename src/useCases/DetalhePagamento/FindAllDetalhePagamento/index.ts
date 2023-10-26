import { MySqlDetalhePagamentoRepository } from "../../../repositories/implementations/MySqlDetalhePagamentoRepository";
import { FindAllDetalhePagamentoUC } from "./FindAllDetalhePagamentoUC";

const mySqlDetalhePagamentoRepository = new MySqlDetalhePagamentoRepository;
const findAllDetalhePagamentoUC = new FindAllDetalhePagamentoUC(mySqlDetalhePagamentoRepository);

export { findAllDetalhePagamentoUC }