import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { DelExecutaFuncaoUC } from "./DelExecutaFuncaoUC";

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const delExecutaFuncaoUC = new DelExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

export { delExecutaFuncaoUC }