import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { createDetalhePagamentoUC } from "../../DetalhePagamento/CreateDetalhePagamento";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { createProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/CreateProdutoHasVendaDireta";
import { createVendaDiretaUC } from "../../VendaDireta/CreateVendaDireta";
import { findOrdemServicoUC } from "../../ordens_servico/FindOrdemServico";
import { setStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico";
import { findProdutoUC } from "../../produtos/FindProduto";
import { setEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto";
import { CreatePagamentoController } from "./CreatePagamentoController";
import { CreatePagamentoUC } from "./CreatePagamentoUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;
const createPagamentoUC = new CreatePagamentoUC(
    mySqlPagamentosRepository, findOrdemServicoUC, findProdutoUC, setStatusOrdemServicoUC, 
    findOSDetalhesUC, findAllProdutoHasOSDetalhesUC, setEstoqueProdutoUC, 
    createDetalhePagamentoUC, createVendaDiretaUC, createProdutoHasVendaDiretaUC,
);

const createPagamentoController = new CreatePagamentoController(createPagamentoUC);

export { createPagamentoUC, createPagamentoController }