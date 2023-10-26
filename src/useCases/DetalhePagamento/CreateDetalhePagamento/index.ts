import { MySqlDetalhePagamentoRepository } from "../../../repositories/implementations/MySqlDetalhePagamentoRepository";
import { CreateDetalhePagamentoUC } from "./CreateDetalhePagamentoUC";

const mySqlDetalhePagamentoRepository = new MySqlDetalhePagamentoRepository;
const createDetalhePagamentoUC = new CreateDetalhePagamentoUC(mySqlDetalhePagamentoRepository);

export { createDetalhePagamentoUC }