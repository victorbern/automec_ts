import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "./FindAllProdutoHasOSDetalhesUC";

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const findAllProdutoHasOSDetalhesUC = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

export { findAllProdutoHasOSDetalhesUC }