import { OSDetalhes } from "../../../entities/OSDetalhes";
import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { FindOSDetalhesBetweenDatesUC } from "../../OSDetalhes/FindOSDetalhesBetweenDates/FindOSDetalhesBetweenDatesUC";
import { IFindOrdemServicoBetweenDatesRequestDTO, IFindOrdemServicoBetweenDatesResponseDTO } from "./FindOrdemServicoBetweenDatesDTO";

export class FindOrdemServicoBetweenDatesUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findOSDetalhesBetweenDates: FindOSDetalhesBetweenDatesUC,
    ) {}

    async execute(data: IFindOrdemServicoBetweenDatesRequestDTO): Promise<IFindOrdemServicoBetweenDatesResponseDTO[]> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400)
            }

            let ordensResult: IFindOrdemServicoBetweenDatesResponseDTO[] = [];

            let osDetalhesList: OSDetalhes[] = await this.findOSDetalhesBetweenDates.execute({dataDe, dataAte});

            for (let i in osDetalhesList) {
                const idOrdemServico = osDetalhesList[i].idOrdemServico;
                const ordemServico: OrdemServico = await this.ordemDeServicoRepository.findById(idOrdemServico);
                if (ordemServico) {
                    ordensResult.push({
                        idOrdemServico: ordemServico.idOrdemServico,
                        total: ordemServico.total,
                        km: ordemServico.km,
                        isFinalizada: ordemServico.isFinalizada,
                        isPaga: ordemServico.isPaga,
                        placaVeiculo: ordemServico.placaVeiculo,
                        idCliente: ordemServico.idCliente,
                        idOSDetalhes: osDetalhesList[i].idOSDetalhes,
                        dataOS: osDetalhesList[i].dataOS,
                    });
                }
            }

            return ordensResult;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}