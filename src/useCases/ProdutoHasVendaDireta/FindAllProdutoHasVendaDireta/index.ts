import { MySqlProdutoHasVendaDiretaRepository } from "../../../repositories/implementations/MySqlProdutoHasVendaDiretaRepository";
import { FindAllProdutoHasVendaDiretaUC } from "./FindAllProdutoHasVendaDiretaUC";

const mySqlProdutoHasVendaDiretaRepository = new MySqlProdutoHasVendaDiretaRepository;
const findAllProdutoHasVendaDiretaUC = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDiretaRepository);

export { findAllProdutoHasVendaDiretaUC }