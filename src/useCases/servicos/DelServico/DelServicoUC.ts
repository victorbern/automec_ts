import { AppError } from "../../../errors/AppError";
import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { IDelServicoRequestDTO } from "./DelServicoDTO";

export class DelServicoUC {
    constructor(
        private servicosRepository: IServicosRepository,
    ) {}

    async execute(data: IDelServicoRequestDTO): Promise<void> {
        try {  
            // Verifica se o id fornecido não é nulo
            const idServico = data.idServico;
            if (!idServico) {
                throw new AppError("Campos faltando", 400);
            }

            // Verificar se o serviço existe
            const servicoExists = await this.servicosRepository.findByIdServico(idServico);

            if (!servicoExists) {
                throw new AppError("Serviço não encontrado", 400);
            }

            await this.servicosRepository.delete(idServico);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected Error!")
            }
        }
    }
}