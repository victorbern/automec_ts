import { MySqlProdutosRepository } from "../../../repositories/implementations/MySqlProdutosRepository";
import { SetEstoqueProdutoUC } from "./SetEstoqueProdutoUC";

const mySqlProdutosRepository = new MySqlProdutosRepository;
const setEstoqueProdutoUC = new SetEstoqueProdutoUC(mySqlProdutosRepository);

export { setEstoqueProdutoUC }