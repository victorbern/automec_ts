import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { delDetalhePagamentoUC } from "../../DetalhePagamento/DelDetalhePagamento";
import { findAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { delProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/DelProdutoHasVendaDireta";
import { findAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta";
import { delVendaDiretaUC } from "../../VendaDireta/DelVendaDireta";
import { findVendaDiretaUC } from "../../VendaDireta/FindVendaDireta";
import { setStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico";
import { setEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto";
import { DelPagamentoController } from "./DelPagamentoController";
import { DelPagamentoUC } from "./DelPagamentoUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;
const delPagamentoUC = new DelPagamentoUC(
    mySqlPagamentosRepository, findAllDetalhePagamentoUC, setStatusOrdemServicoUC, findOSDetalhesUC, 
    findAllProdutoHasOSDetalhesUC, setEstoqueProdutoUC, delDetalhePagamentoUC, findVendaDiretaUC, 
    findAllProdutoHasVendaDiretaUC, delProdutoHasVendaDiretaUC, delVendaDiretaUC
)

const delPagamentoController = new DelPagamentoController(delPagamentoUC);

export { delPagamentoUC, delPagamentoController }

