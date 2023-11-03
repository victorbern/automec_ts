import { findPagamentosBetweenDatesUC } from "../../Pagamentos/FindPagamentosBetweenDates";
import { GetRelatorioPagamentosController } from "./GetRelatorioPagamentosController";
import { GetRelatorioPagamentosUC } from "./GetRelatorioPagamentosUC";

const getRelatorioPagamentosUC = new GetRelatorioPagamentosUC(findPagamentosBetweenDatesUC);
const getRelatorioPagamentosController = new GetRelatorioPagamentosController(getRelatorioPagamentosUC);

export { getRelatorioPagamentosUC, getRelatorioPagamentosController }