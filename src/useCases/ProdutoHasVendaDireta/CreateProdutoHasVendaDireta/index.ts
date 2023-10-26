import { MySqlProdutoHasVendaDiretaRepository } from "../../../repositories/implementations/MySqlProdutoHasVendaDiretaRepository";
import { CreateProdutoHasVendaDiretaUC } from "./CreateProdutoHasVendaDiretaUC";

const mySqlProdutoHasVendaDiretaRepository = new MySqlProdutoHasVendaDiretaRepository;
const createProdutoHasVendaDiretaUC = new CreateProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDiretaRepository);

export { createProdutoHasVendaDiretaUC }