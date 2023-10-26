import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { delExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao";
import { findAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao";
import { delOSDetalhesUC } from "../../OSDetalhes/DelOSDetalhes";
import { findOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes";
import { delProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes";
import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { DelOrdemServicoController } from "./DelOrdemServicoController";
import { DelOrdemServicoUC } from "./DelOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;

const delOrdemServicoUC = new DelOrdemServicoUC(
    mySqlOrdemServicoRepository, findOSDetalhesUC, findAllProdutoHasOSDetalhesUC, 
    delProdutoHasOSDetalhesUC, findAllExecutaFuncaoUC, delExecutaFuncaoUC, delOSDetalhesUC
)

const delOrdemServicoController = new DelOrdemServicoController(delOrdemServicoUC);

export { delOrdemServicoUC, delOrdemServicoController }
