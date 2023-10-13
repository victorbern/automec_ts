import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { MySqlOSDetalhesRepository } from "../../../repositories/implementations/MySqlOSDetalhesRepository";
import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { DelOSDetalhesUC } from "../../OSDetalhes/DelOSDetalhes/DelOSDetalhesUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { DelOrdemServicoController } from "./DelOrdemServicoController";
import { DelOrdemServicoUC } from "./DelOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;

const mySqlOSDetalhesRepository = new MySqlOSDetalhesRepository;
const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhesRepository);

const mySqlProdutoHasOSDetalhes = new MySqlProdutoHasOSDetalhesRepository;
const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
const delProdutoHasOSDetalhes = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

const mySqlExecutaFuncao = new MySqlExecutaFuncaoRepository;
const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);
const delExecutaFuncao = new DelExecutaFuncaoUC(mySqlExecutaFuncao);

const delOSDetalhes = new DelOSDetalhesUC(mySqlOSDetalhesRepository);

const delOrdemServicoUC = new DelOrdemServicoUC(
    mySqlOrdemServicoRepository, findOSDetalhes,
    findAllProdutoHasOSDetalhes, delProdutoHasOSDetalhes,
    findAllExecutaFuncao, delExecutaFuncao, delOSDetalhes
)

const delOrdemServicoController = new DelOrdemServicoController(delOrdemServicoUC);

export { delOrdemServicoUC, delOrdemServicoController }
