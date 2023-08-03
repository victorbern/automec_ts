import { Servico } from "../../../entities/Servico";
import { AppError } from "../../../errors/AppError";
import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { ICreateServicoRequestDTO } from "./CreateServicoDTO";

export class CreateServicoUC {
    constructor(
        private servicosRepository: IServicosRepository
    ) {}

    async execute(data: ICreateServicoRequestDTO): Promise<void> {
        try {
            if (!data.descricaoServico || !data.precoServico) {
                throw new AppError('Campos faltando', 400);
            }

            const servico = new Servico(data);
            await this.servicosRepository.save(servico);
            
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}