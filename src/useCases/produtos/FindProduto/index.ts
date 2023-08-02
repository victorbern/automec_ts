import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { FindProdutoController } from "./FindProdutoController";
import { FindProdutoUC } from "./FindProdutoUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const findProdutoUC = new FindProdutoUC(mySqlProdutosRepository);

const findProdutoController = new FindProdutoController(findProdutoUC);

export { findProdutoUC, findProdutoController }