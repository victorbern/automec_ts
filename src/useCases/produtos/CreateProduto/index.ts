import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { CreateProdutoController } from "./CreateProdutoController";
import { CreateProdutoUC } from "./CreateProdutoUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const createProdutoUC = new CreateProdutoUC(mySqlProdutosRepository);

const createProdutoController = new CreateProdutoController(createProdutoUC);

export { createProdutoUC, createProdutoController };