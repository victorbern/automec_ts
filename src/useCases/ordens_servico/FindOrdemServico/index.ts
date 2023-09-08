import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { FindOrdemServicoController } from "./FindOrdemServicoController";
import { FindOrdemServicoUC } from "./FindOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;

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

const findOrdemServicoUC = new FindOrdemServicoUC(
    mySqlOrdemServicoRepository, findCliente, findVeiculo,
    findOSDetalhes, findAllProdutoHasOSDetalhes, findAllExecutaFuncao,
    findProduto, findServico, findFuncionario
);

const findOrdemServicoController = new FindOrdemServicoController(findOrdemServicoUC);

export { findOrdemServicoUC, findOrdemServicoController }