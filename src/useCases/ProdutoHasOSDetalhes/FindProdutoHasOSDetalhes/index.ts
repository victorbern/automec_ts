import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { FindProdutoHasOSDetalhesUC } from "./FindProdutoHasOSDetalhesUC";

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const findProdutoHasOSDetalhesUC = new FindProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

export { findProdutoHasOSDetalhesUC }