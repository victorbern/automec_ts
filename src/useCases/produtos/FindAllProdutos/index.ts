import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { FindAllProdutosController } from "./FindAllProdutosController";
import { FindAllProdutosUC } from "./FindAllProdutosUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const findAllProdutosUC = new FindAllProdutosUC(mySqlProdutosRepository);

const findAllProdutosController = new FindAllProdutosController(findAllProdutosUC);

export { findAllProdutosUC, findAllProdutosController }