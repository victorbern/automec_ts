import { AppError } from "../../../errors/AppError";
import { FindPagamentosBetweenDatesUC } from "../../Pagamentos/FindPagamentosBetweenDates/FindPagamentosBetweenDatesUC";
import { IGetRelatorioPagamentosRequestDTO, IGetRelatorioPagamentosResponseDTO, IGetRelatorioPagamentosTipos } from "./GetRelatorioPagamentosDTO";

export class GetRelatorioPagamentosUC {
    constructor(
        private findPagamentosBetweenDates: FindPagamentosBetweenDatesUC
    ) { }

    async execute(data: IGetRelatorioPagamentosRequestDTO): Promise<IGetRelatorioPagamentosResponseDTO> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            let relatorioResult: IGetRelatorioPagamentosResponseDTO;
            let total = 0;
            let tiposResult: IGetRelatorioPagamentosTipos[] = [];


            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }

            const pagamentos = await this.findPagamentosBetweenDates.execute({ dataDe, dataAte });
            // Soma os totais de todos os pagamentos
            pagamentos.forEach(
                (pagamento, index, array) => (total += pagamento.total)
            );
            // Cria um array que armazena todos os "tipos de pagamento" que estão presentes no relatório
            let tipos: string[] = [];
            for (let i in pagamentos) {
                let existe = false;

                for (let j in tipos) {
                    if (tipos[j] === pagamentos[i].formaPagamento) {
                        existe = true;
                    }
                }
                if (!existe) {
                    tipos.push(pagamentos[i].formaPagamento);
                }
            }

            // Para cada um dos "tipos de pagamento" do array, armazena os dados dos pagamentos
            let dadosPorFormaPagamento = [];
            for (let i in tipos) {
                let dados = pagamentos.filter(
                    (pagamento, index, array) =>
                        pagamento.formaPagamento === tipos[i]
                );
                dadosPorFormaPagamento.push(dados);
            }

            // Soma do total por tipo
            let totalTipo: number[] = [];
            for (let i in dadosPorFormaPagamento) {
                let soma = 0;
                dadosPorFormaPagamento[i].forEach(
                    (pagamento, index, array) => (soma += pagamento.total)
                );
                totalTipo.push(soma);
            }

            for (let i in tipos) {
                tiposResult.push({
                    tipo: tipos[i],
                    total: totalTipo[i],
                    pagamentos: dadosPorFormaPagamento[i]
                })
            }

            relatorioResult = {
                total: total,
                tipos: tiposResult
            }

            return relatorioResult;

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}