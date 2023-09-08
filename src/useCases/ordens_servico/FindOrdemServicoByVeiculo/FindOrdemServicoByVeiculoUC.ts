import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { IFindOrdemServicoByVeiculoRequestDTO, IFindOrdemServicoByVeiculoResponseDTO } from "./FindOrdemServicoByVeiculoDTO";

export class FindOrdemServicoByVeiculoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository
    ) {}

    async execute(data: IFindOrdemServicoByVeiculoRequestDTO): Promise<IFindOrdemServicoByVeiculoResponseDTO[]> {
        try {
            if (!data.placaVeiculo) {
                throw new AppError("Placa do veículo em falta", 400);
            }

            let ordens: OrdemServico[] = await this.ordemDeServicoRepository.findByVeiculo(data.placaVeiculo);

            return ordens;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}