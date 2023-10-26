import { MySqlProdutoHasVendaDiretaRepository } from "../../../repositories/implementations/MySqlProdutoHasVendaDiretaRepository";
import { DelProdutoHasVendaDiretaUC } from "./DelProdutoHasVendaDiretaUC";

const mySqlProdutoHasVendaDiretaRepository = new MySqlProdutoHasVendaDiretaRepository;
const delProdutoHasVendaDiretaUC = new DelProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDiretaRepository);

export { delProdutoHasVendaDiretaUC }