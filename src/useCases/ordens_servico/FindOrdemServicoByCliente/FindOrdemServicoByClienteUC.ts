import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { IFindOrdemServicoByClienteRequestDTO, IFindOrdemServicoByClienteResponseDTO } from "./FindOrdemServicoByClienteDTO";

export class FindOrdemServicoByClienteUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository
    ) {}

    async execute(data: IFindOrdemServicoByClienteRequestDTO): Promise<IFindOrdemServicoByClienteResponseDTO[]>{
        try {
            if (!data.idCliente) {
                throw new AppError("Campo id faltante", 400);
            }

            let ordens: OrdemServico[] = await this.ordemDeServicoRepository.findByCliente(data.idCliente);

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