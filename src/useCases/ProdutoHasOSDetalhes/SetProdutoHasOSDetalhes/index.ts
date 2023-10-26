import { MySqlProdutoHasOSDetalhesRepository } from "../../../repositories/implementations/MySqlProdutoHasOSDetalhesRepository";
import { SetProdutoHasOSDetalhesUC } from "./SetProdutoHasOSDetalhesUC";

const mySqlProdutoHasOSDetalhesRepository = new MySqlProdutoHasOSDetalhesRepository;
const setProdutoHasOSDetalhesUC = new SetProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhesRepository);

export { setProdutoHasOSDetalhesUC }