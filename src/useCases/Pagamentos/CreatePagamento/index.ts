import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlDetalhePagamentoRepository } from "../../../repositories/implementations/MySqlDetalhePagamentoRepository";
import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { MySqlPagamentosRepository } from "../../../repositories/implementations/MySqlPagamentosRepository";
import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { MySqlProdutoHasVendaDiretaRepository } from "../../../repositories/implementations/MySqlProdutoHasVendaDiretaRepository";
import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { MySqlVendaDiretaRepository } from "../../../repositories/implementations/MySqlVendaDiretaRepository";
import { CreateDetalhePagamentoUC } from "../../DetalhePagamento/CreateDetalhePagamento/CreateDetalhePagamentoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { CreateProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/CreateProdutoHasVendaDireta/CreateProdutoHasVendaDiretaUC";
import { CreateVendaDiretaUC } from "../../VendaDireta/CreateVendaDireta/CreateVendaDiretaUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { SetStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico/SetStatusOrdemServicoUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { SetEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto/SetEstoqueProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { CreatePagamentoController } from "./CreatePagamentoController";
import { CreatePagamentoUC } from "./CreatePagamentoUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;
const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculo = new FindVeiculoUC(mySqlVeiculosRepository, findCliente);

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhesRepository);

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

const mySqlProdutosRepository = new MySqlProdutosRepository;
const findProduto = new FindProdutoUC(mySqlProdutosRepository);
const setEstoqueProduto = new SetEstoqueProdutoUC(mySqlProdutosRepository);

const mySqlServicosRepository = new MySqlServicosRepository;
const findServico = new FindServicoUC(mySqlServicosRepository);

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const findFuncionario = new FindFuncionarioUC(mySqlFuncionariosRepository);

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findOrdemServico = new FindOrdemServicoUC(
    mySqlOrdemServicoRepository, findCliente, findVeiculo, 
    findOSDetalhes, findAllProdutoHasOSDetalhes, findAllExecutaFuncao, 
    findProduto, findServico, findFuncionario,
);

const setStatusOrdemServico = new SetStatusOrdemServicoUC(mySqlOrdemServicoRepository);

const mySqlDetalhePagamento = new MySqlDetalhePagamentoRepository;
const createDetalhePagamento = new CreateDetalhePagamentoUC(mySqlDetalhePagamento);

const mySqlVendaDireta = new MySqlVendaDiretaRepository;
const createVendaDireta = new CreateVendaDiretaUC(mySqlVendaDireta);

const mySqlProdutoHasVendaDireta = new MySqlProdutoHasVendaDiretaRepository;
const createProdutoHasVendaDireta = new CreateProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

const createPagamentoUC = new CreatePagamentoUC(
    mySqlPagamentosRepository, findOrdemServico, findProduto, 
    setStatusOrdemServico, findOSDetalhes, findAllProdutoHasOSDetalhes, 
    setEstoqueProduto, createDetalhePagamento, createVendaDireta, createProdutoHasVendaDireta
)

const createPagamentoController = new CreatePagamentoController(createPagamentoUC);

export { createPagamentoUC, createPagamentoController }