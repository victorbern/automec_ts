import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { findAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { findAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta";
import { findVendaDiretaUC } from "../../VendaDireta/FindVendaDireta";
import { findOrdemServicoUC } from "../../ordens_servico/FindOrdemServico";
import { findProdutoUC } from "../../produtos/FindProduto";
import { FindPagamentoUC } from "../FindPagamento/FindPagamentoUC";
import { FindAllPagamentosController } from "./FindAllPagamentosController";
import { FindAllPagamentosUC } from "./FindAllPagamentosUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;
const findPagamento = new FindPagamentoUC(
    mySqlPagamentosRepository, findAllDetalhePagamentoUC, findOrdemServicoUC, findOSDetalhesUC, 
    findVendaDiretaUC, findAllProdutoHasVendaDiretaUC, findProdutoUC,
);

const findAllPagamentosUC = new FindAllPagamentosUC(mySqlPagamentosRepository, findPagamento);

const findAllPagamentosController = new FindAllPagamentosController(findAllPagamentosUC);

export { findAllPagamentosUC, findAllPagamentosController }