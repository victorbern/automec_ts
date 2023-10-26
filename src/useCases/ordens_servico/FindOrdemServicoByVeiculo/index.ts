import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { FindOrdemServicoByVeiculoUC } from "./FindOrdemServicoByVeiculoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findOrdemServicoByVeiculoUC = new FindOrdemServicoByVeiculoUC(mySqlOrdemServicoRepository);

export { findOrdemServicoByVeiculoUC }