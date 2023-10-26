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
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { FindVendaDiretaUC } from "../../VendaDireta/FindVendaDireta/FindVendaDiretaUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { FindPagamentoUC } from "../FindPagamento/FindPagamentoUC";
import { FindAllPagamentosController } from "./FindAllPagamentosController";
import { FindAllPagamentosUC } from "./FindAllPagamentosUC";

const mySqlPagamentosRepository = new MySqlPagamentosRepository;

const mySqlDetalhePagamentoRepository = new MySqlDetalhePagamentoRepository;
const findAllDetalhePagamento = new FindAllDetalhePagamentoUC(mySqlDetalhePagamentoRepository);

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

const mySqlVendaDiretaRepository = new MySqlVendaDiretaRepository;
const findVendaDireta = new FindVendaDiretaUC(mySqlVendaDiretaRepository);

const mySqlProdutoHasVendaDiretaRepository = new MySqlProdutoHasVendaDiretaRepository;
const findAllProdutoHasVendaDireta = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDiretaRepository);

const findPagamento = new FindPagamentoUC(
    mySqlPagamentosRepository, findAllDetalhePagamento, findOrdemServico, 
    findOSDetalhes, findVendaDireta, findAllProdutoHasVendaDireta, findProduto
)

const findAllPagamentosUC = new FindAllPagamentosUC(mySqlPagamentosRepository, findPagamento);

const findAllPagamentosController = new FindAllPagamentosController(findAllPagamentosUC);

export { findAllPagamentosUC, findAllPagamentosController }