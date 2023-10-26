import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { createExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao";
import { createOSDetalhesUC } from "../../OSDetalhes/CreateOSDetalhes";
import { createProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes";
import { findClienteUC } from "../../clientes/FindCliente";
import { findFuncionarioUC } from "../../funcionarios/FindFuncionario";
import { findProdutoUC } from "../../produtos/FindProduto";
import { findServicoUC } from "../../servicos/FindServico";
import { findVeiculoUC } from "../../veiculos/FindVeiculo";
import { CreateOrdemServicoController } from "./CreateOrdemServicoController";
import { CreateOrdemServicoUC } from "./CreateOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;

const createOrdemServicoUC = new CreateOrdemServicoUC(
    mySqlOrdemServicoRepository, findClienteUC, findVeiculoUC, 
    findProdutoUC, findServicoUC, findFuncionarioUC, 
    createOSDetalhesUC, createProdutoHasOSDetalhesUC, createExecutaFuncaoUC
);

const createOrdemServicoController = new CreateOrdemServicoController(createOrdemServicoUC);

export { createOrdemServicoUC, createOrdemServicoController }