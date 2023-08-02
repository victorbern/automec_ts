import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { SetProdutoController } from "./SetProdutoController";
import { SetProdutoUC } from "./SetProdutoUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const setProdutoUC = new SetProdutoUC(mySqlProdutosRepository);

const setProdutoController = new SetProdutoController(setProdutoUC);

export { setProdutoUC, setProdutoController }