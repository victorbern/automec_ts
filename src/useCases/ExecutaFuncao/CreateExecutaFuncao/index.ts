import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { CreateExecutaFuncaoUC } from "./CreateExecutaFuncaoUC";

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const createExecutaFuncaoUC = new CreateExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

export { createExecutaFuncaoUC }