import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { ISetStatusOrdemServicoRequestDTO } from "./SetStatusOrdemServicoDTO";

export class SetStatusOrdemServicoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
    ) {}

    async execute(data: ISetStatusOrdemServicoRequestDTO): Promise<void> {
        try {
            const idOrdemServico = data.idOrdemServico;
            const isPaga = data.isPaga;

            if (!idOrdemServico) {
                throw new AppError("Campos faltando", 400);
            }

            const ordemServico = await this.ordemDeServicoRepository.findById(idOrdemServico);

            if(!ordemServico) {
                throw new AppError("Ordem de Serviço não encontrada", 400);
            }

            ordemServico.isPaga = isPaga;

            await this.ordemDeServicoRepository.update(ordemServico);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}