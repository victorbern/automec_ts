import { Servico } from "../../../entities/Servico";
import { AppError } from "../../../errors/AppError";
import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { ISetServicoRequestDTO } from "./SetServicoDTO";

export class SetServicoUC {
    constructor(
        private servicosRepository: IServicosRepository
    ) {}

    async execute(data: ISetServicoRequestDTO): Promise<void> {
        try {
            if (!data.idServico || !data.descricaoServico || !data.precoServico) {
                throw new AppError('There are missing fields', 400)
            }

            const servicoExists = await this.servicosRepository.findByIdServico(data.idServico);
            if (!servicoExists) {
                throw new AppError('Service does not found', 400);
            }

            const servico = new Servico(data);

            await this.servicosRepository.update(servico);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected error")
            }
        }
    }
}