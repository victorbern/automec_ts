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
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindExecutaFuncaoUC } from "../../ExecutaFuncao/FindExecutaFuncao/FindExecutaFuncaoUC";
import { SetExecutaFuncaoUC } from "../../ExecutaFuncao/SetExecutaFuncao/SetExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindProdutoHasOSDetalhes/FindProdutoHasOSDetalhesUC";
import { SetProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/SetProdutoHasOSDetalhes/SetProdutoHasOSDetalhesUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { SetOrdemServicoController } from "./SetOrdemServicoController";
import { SetOrdemServicoUC } from "./SetOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;

const mySqlClientesRepository = new MySqlClientesRepository;
const findCliente = new FindClienteUC(mySqlClientesRepository);

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculo = new FindVeiculoUC(mySqlVeiculosRepository, findCliente);

const mySqlProdutosRepository = new MySqlProdutosRepository;
const findProduto = new FindProdutoUC(mySqlProdutosRepository);

const mySqlServicosRepository = new MySqlServicosRepository;
const findServico = new FindServicoUC(mySqlServicosRepository);

const mySqlFuncionariosRepository = new MySqlFuncionariosRepository;
const findFuncionario = new FindFuncionarioUC(mySqlFuncionariosRepository);

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhesRepository);

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);
const delProdutoHasOSDetalhes = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);
const findProdutoHasOSDetalhes = new FindProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);
const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);
const setProdutoHasOSDetalhes = new SetProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncaoRepository);
const delExecutaFuncao = new DelExecutaFuncaoUC(mySqlExecutaFuncaoRepository);
const findExecutaFuncao = new FindExecutaFuncaoUC(mySqlExecutaFuncaoRepository);
const createExecutaFuncao = new CreateExecutaFuncaoUC(mySqlExecutaFuncaoRepository);
const setExecutaFuncao = new SetExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

const setOrdemServicoUC = new SetOrdemServicoUC(
    mySqlOrdemServicoRepository, findCliente, findVeiculo,
    findProduto, findServico, findFuncionario,
    findOSDetalhes, findAllProdutoHasOSDetalhes, delProdutoHasOSDetalhes,
    findProdutoHasOSDetalhes, createProdutoHasOSDetalhes, setProdutoHasOSDetalhes,
    findAllExecutaFuncao, delExecutaFuncao, findExecutaFuncao,
    createExecutaFuncao, setExecutaFuncao
)

const setOrdemServicoController = new SetOrdemServicoController(setOrdemServicoUC);

export { setOrdemServicoUC, setOrdemServicoController }