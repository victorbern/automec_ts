import { DetalhePagamento } from "../../../entities/DetalhePagamento";
import { Pagamento } from "../../../entities/Pagamento";
import { AppError } from "../../../errors/AppError";
import { IPagamentosRepository } from "../../../repositories/IPagamentosRepository";
import { isNumber } from "../../../utils/UsefulFunctions";
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { FindPagamentoUC } from "../FindPagamento/FindPagamentoUC";
import { IFindAllPagamentosOrdemServico, IFindAllPagamentosRequestDTO, IFindAllPagamentosResponseDTO, IFindAllPagamentosVendaDireta } from "./FindAllPagamentosDTO";

export class FindAllPagamentosUC {
    constructor(
        private pagamentosRepository: IPagamentosRepository,
        private findPagamento: FindPagamentoUC,
    ) {}

    async execute(data: IFindAllPagamentosRequestDTO): Promise<IFindAllPagamentosResponseDTO[]> {
        try {
            let pagamentos: Pagamento[] = [];

            if (!data.filtro) {
                pagamentos = await this.pagamentosRepository.findAll();
            } else {
                if (isNumber(data.filtro)) {
                    let pagamento = await this.pagamentosRepository.findById(Number(data.filtro))
                    // Verifica se foi encontrada um pagamento
                    if (pagamento) {
                        pagamentos.push(pagamento);
                    }
                }
            }

            if (!pagamentos) {
                throw new AppError("Não foram encontrados pagamentos", 400);
            }

            let pagamentosResult: IFindAllPagamentosResponseDTO[] = [];
            for (let i in pagamentos) {
                const idPagamento = pagamentos[i].idPagamento;
                let pagamento = await this.findPagamento.execute({idPagamento});
                let ordemServicoResultList: IFindAllPagamentosOrdemServico[] = [];
                let vendaDiretaResultList: IFindAllPagamentosVendaDireta[] = [];

                if (pagamento.ordensServico) {
                    for (let j in pagamento.ordensServico) {
                        const ordemServico = pagamento.ordensServico[j];
                        ordemServicoResultList.push({
                            idOrdemServico: ordemServico.idOrdemServico,
                            total: ordemServico.total,
                            dataOS: ordemServico.dataOS,
                            km: ordemServico.km,
                            cliente: ordemServico.cliente,
                            veiculo: ordemServico.veiculo
                        })
                    }
                }

                if (pagamento.vendaDireta) {
                    for (let j in pagamento.vendaDireta) {
                        const vendaDireta = pagamento.vendaDireta[j];
                        vendaDiretaResultList.push({
                            codigoBarras: vendaDireta.codigoBarras,
                            descricao: vendaDireta.descricao,
                            quantidadeVendida: vendaDireta.quantidadeVendida,
                            precoTotal: vendaDireta.precoTotal,
                            precoUnitario: vendaDireta.precoUnitario,
                        })
                    }
                }
                pagamentosResult.push({
                    idPagamento: pagamentos[i].idPagamento,
                    subtotal: pagamentos[i].subtotal,
                    total: pagamentos[i].total,
                    formaPagamento: pagamentos[i].formaPagamento,
                    desconto: pagamentos[i].desconto,
                    dataHora: pagamentos[i].dataHora,
                    vendaDireta: vendaDiretaResultList,
                    ordensServico: ordemServicoResultList,
                })
                
            }

            return pagamentosResult;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}