import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { CreateProdutoHasOSDetalhesUC } from "./CreateProdutoHasOSDetalhesUC";

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const createProdutoHasOSDetalhesUC = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

export { createProdutoHasOSDetalhesUC }