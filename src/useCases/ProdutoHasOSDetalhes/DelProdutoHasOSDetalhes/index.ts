import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { DelProdutoHasOSDetalhesUC } from "./DelProdutoHasOSDetalhesUC";

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const delProdutoHasOSDetalhesUC = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

export { delProdutoHasOSDetalhesUC }