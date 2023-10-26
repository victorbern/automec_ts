import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { SetStatusOrdemServicoUC } from "./SetStatusOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const setStatusOrdemServicoUC = new SetStatusOrdemServicoUC(mySqlOrdemServicoRepository);

export { setStatusOrdemServicoUC }