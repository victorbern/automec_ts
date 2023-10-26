import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { FindOrdemServicoByClienteUC } from "./FindOrdemServicoByClienteUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findOrdemServicoByClienteUC = new FindOrdemServicoByClienteUC(mySqlOrdemServicoRepository);

export { findOrdemServicoByClienteUC }