import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { findAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { findClienteUC } from "../../clientes/FindCliente";
import { findFuncionarioUC } from "../../funcionarios/FindFuncionario";
import { findProdutoUC } from "../../produtos/FindProduto";
import { findServicoUC } from "../../servicos/FindServico";
import { findVeiculoUC } from "../../veiculos/FindVeiculo";
import { FindOrdemServicoController } from "./FindOrdemServicoController";
import { FindOrdemServicoUC } from "./FindOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findOrdemServicoUC = new FindOrdemServicoUC(
    mySqlOrdemServicoRepository, findClienteUC, findVeiculoUC, 
    findOSDetalhesUC, findAllProdutoHasOSDetalhesUC, findAllExecutaFuncaoUC, 
    findProdutoUC, findServicoUC, findFuncionarioUC
);

const findOrdemServicoController = new FindOrdemServicoController(findOrdemServicoUC);

export { findOrdemServicoUC, findOrdemServicoController }