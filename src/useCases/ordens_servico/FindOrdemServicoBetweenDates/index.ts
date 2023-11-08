import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { findOSDetalhesBetweenDatesUC } from "../../OSDetalhes/FindOSDetalhesBetweenDates";
import { FindOrdemServicoBetweenDatesUC } from "./FindOrdemServicoBetweenDatesUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findordemServicobetweenDatesUC = new FindOrdemServicoBetweenDatesUC(mySqlOrdemServicoRepository, findOSDetalhesBetweenDatesUC);

export { findordemServicobetweenDatesUC }