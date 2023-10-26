import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { findAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { findAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta";
import { findVendaDiretaUC } from "../../VendaDireta/FindVendaDireta";
import { findOrdemServicoUC } from "../../ordens_servico/FindOrdemServico";
import { findProdutoUC } from "../../produtos/FindProduto";
import { FindPagamentoController } from "./FindPagamentoController";
import { FindPagamentoUC } from "./FindPagamentoUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;

const findPagamentoUC = new FindPagamentoUC(
    mySqlPagamentosRepository, findAllDetalhePagamentoUC, findOrdemServicoUC, findOSDetalhesUC, 
    findVendaDiretaUC, findAllProdutoHasVendaDiretaUC, findProdutoUC,
);
const findPagamentoController = new FindPagamentoController(findPagamentoUC);

export { findPagamentoUC, findPagamentoController }