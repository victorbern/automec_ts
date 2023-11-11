import { AppError } from "../../../errors/AppError";
import { FindOrdemServicoBetweenDatesUC } from "../../ordens_servico/FindOrdemServicoBetweenDates/FindOrdemServicoBetweenDatesUC";
import { IGetRelatorioOrdemServicoRequestDTO, IGetRelatorioOrdemServicoResponseDTO } from "./GetRelatorioOrdemServicoDTO";

export class GetRelatorioOrdemServicoUC {
    constructor(
        private findOrdemServicoBetweenDatesUC: FindOrdemServicoBetweenDatesUC,
    ) { }

    async execute(data: IGetRelatorioOrdemServicoRequestDTO): Promise<IGetRelatorioOrdemServicoResponseDTO> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            let relatorioResult: IGetRelatorioOrdemServicoResponseDTO;
            let total = 0;
            let subtotalPagas = 0;
            let subtotalNaoPagas = 0;

            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }

            const ordens = await this.findOrdemServicoBetweenDatesUC.execute({ dataDe, dataAte })

            // Soma todos os totais das ordens de serviço
            ordens.forEach(
                (ordem, index, array) => (total += ordem.total)
            );

            // Salva as ordens pagas em um array
            let ordensPagas = ordens.filter(
                (ordem, index, array) => ordem.isPaga == true
            );

            // Salva as ordens não pagas em um array
            let ordensNaoPagas = ordens.filter(
                (ordem, index, array) => ordem.isPaga == false
            );
            
            // Soma o total das ordens de serviço pagas
            ordensPagas.forEach(
                (ordem, index, array) => (subtotalPagas += ordem.total)
            );

            // Soma o total das ordens de serviço não pagas
            ordensNaoPagas.forEach(
                (ordem, index, array) => (subtotalNaoPagas += ordem.total)
            );

            relatorioResult = {
                total: total,
                subtotalPagas: subtotalPagas,
                subtotalNaoPagas: subtotalNaoPagas,
                pagas: ordensPagas,
                naoPagas: ordensNaoPagas,
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