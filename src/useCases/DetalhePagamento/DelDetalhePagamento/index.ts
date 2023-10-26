import { MySqlDetalhePagamentoRepository } from "../../../repositories/implementations/MySqlDetalhePagamentoRepository";
import { DelDetalhePagamentoUC } from "./DelDetalhePagamentoUC";

const mySqlDetalhePagamentoRepository = new MySqlDetalhePagamentoRepository;
const delDetalhePagamentoUC = new DelDetalhePagamentoUC(mySqlDetalhePagamentoRepository);

export { delDetalhePagamentoUC }