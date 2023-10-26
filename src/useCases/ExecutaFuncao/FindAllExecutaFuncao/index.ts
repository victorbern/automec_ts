import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { FindAllExecutaFuncaoUC } from "./FindAllExecutaFuncaoUC";

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const findAllExecutaFuncaoUC = new FindAllExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

export { findAllExecutaFuncaoUC }