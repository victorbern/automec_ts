import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { DelProdutoController } from "./DelProdutoController";
import { DelProdutoUC } from "./DelProdutoUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const delProdutoUC = new DelProdutoUC(mySqlProdutosRepository);

const delProdutoController = new DelProdutoController(delProdutoUC);

export { delProdutoUC, delProdutoController }