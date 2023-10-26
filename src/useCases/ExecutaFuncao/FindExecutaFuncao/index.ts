import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { FindExecutaFuncaoUC } from "./FindExecutaFuncaoUC";

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const findExecutaFuncaoUC = new FindExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

export { findExecutaFuncaoUC }