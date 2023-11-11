import { findordemServicobetweenDatesUC } from "../../ordens_servico/FindOrdemServicoBetweenDates";
import { GetRelatorioOrdemServicoController } from "./GetRelatorioOrdemServicoController";
import { GetRelatorioOrdemServicoUC } from "./GetRelatorioOrdemServicoUC";

const getRelatorioOrdemServicoUC = new GetRelatorioOrdemServicoUC(findordemServicobetweenDatesUC);
const getRelatorioOrdemServicoController = new GetRelatorioOrdemServicoController(getRelatorioOrdemServicoUC);

export { getRelatorioOrdemServicoUC, getRelatorioOrdemServicoController }