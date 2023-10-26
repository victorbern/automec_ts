import { MySqlExecutaFuncaoRepository } from "../../../repositories/implementations/MySqlExecutaFuncaoRepository";
import { SetExecutaFuncaoUC } from "./SetExecutaFuncaoUC";

const mySqlExecutaFuncaoRepository = new MySqlExecutaFuncaoRepository;
const setExecutaFuncaoUC = new SetExecutaFuncaoUC(mySqlExecutaFuncaoRepository);

export { setExecutaFuncaoUC }