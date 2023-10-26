import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { createExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao";
import { delExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao";
import { findAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao";
import { findExecutaFuncaoUC } from "../../ExecutaFuncao/FindExecutaFuncao";
import { setExecutaFuncaoUC } from "../../ExecutaFuncao/SetExecutaFuncao";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { createProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes";
import { delProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes";
import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { findProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindProdutoHasOSDetalhes";
import { setProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/SetProdutoHasOSDetalhes";
import { findClienteUC } from "../../clientes/FindCliente";
import { findFuncionarioUC } from "../../funcionarios/FindFuncionario";
import { findProdutoUC } from "../../produtos/FindProduto";
import { findServicoUC } from "../../servicos/FindServico";
import { findVeiculoUC } from "../../veiculos/FindVeiculo";
import { SetOrdemServicoController } from "./SetOrdemServicoController";
import { SetOrdemServicoUC } from "./SetOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const setOrdemServicoUC = new SetOrdemServicoUC(
    mySqlOrdemServicoRepository, findClienteUC, findVeiculoUC, 
    findProdutoUC, findServicoUC, findFuncionarioUC, findOSDetalhesUC, 
    findAllProdutoHasOSDetalhesUC, delProdutoHasOSDetalhesUC, findProdutoHasOSDetalhesUC, 
    createProdutoHasOSDetalhesUC, setProdutoHasOSDetalhesUC, findAllExecutaFuncaoUC,
    delExecutaFuncaoUC, findExecutaFuncaoUC, createExecutaFuncaoUC, setExecutaFuncaoUC
)

const setOrdemServicoController = new SetOrdemServicoController(setOrdemServicoUC);

export { setOrdemServicoUC, setOrdemServicoController }