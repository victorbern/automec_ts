import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";
import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { MySqlFuncionariosRepository } from "../../../repositories/implementations/MySqlFuncionariosRepository";
import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { MySqlServicosRepository } from "../../../repositories/implementations/MySqlServicosRepository";
import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { CreateExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao/CreateExecutaFuncaoUC";
import { CreateOSDetalhesUC } from "../../OSDetalhes/CreateOSDetalhes/CreateOSDetalhesUC";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { CreateOrdemServicoController } from "./CreateOrdemServicoController";
import { CreateOrdemServicoUC } from "./CreateOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository();

const mySqlClientesRepository = new MySqlClientesRepository();
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository();
const findVeiculo = new FindVeiculoUC(mySqlVeiculosRepository, findCliente);

const mySqlProdutosRepository = new MySqlProdutosRepository();
const findProduto = new FindProdutoUC(mySqlProdutosRepository);

const mySqlServicosRepository = new MySqlServicosRepository();
const findServico = new FindServicoUC(mySqlServicosRepository);

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository();
const findFuncionario = new FindFuncionarioUC(mySqlFuncionariosRepository);

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository();
const createOSDetalhes = new CreateOSDetalhesUC(mySqlOSDetalhesRepository);

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository();
const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository();
const createExecutaFunca = new CreateExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

const createOrdemServicoUC = new CreateOrdemServicoUC(
    mySqlOrdemServicoRepository, findCliente, findVeiculo, 
    findProduto, findServico, findFuncionario, 
    createOSDetalhes, createProdutoHasOSDetalhes, createExecutaFunca
);

const createOrdemServicoController = new CreateOrdemServicoController(createOrdemServicoUC);

export { createOrdemServicoUC, createOrdemServicoController }