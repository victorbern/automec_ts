import { AppError } from "../../../errors/AppError";
import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { IFindServicoRequestDTO, IFindServicoResponseDTO } from "./FindServicoDTO";

export class FindServicoUC {
    constructor(
        private servicosRepository: IServicosRepository
    ) {}

    async execute(data: IFindServicoRequestDTO): Promise<IFindServicoResponseDTO> {
        try {
            const servico = this.servicosRepository.findByIdServico(data.idServico);
            if (servico == null || servico == undefined) {
                return null;
            }

            return servico;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}