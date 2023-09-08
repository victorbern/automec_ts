import { OSDetalhes } from "../../../entities/OSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IOSDetalhesRepository } from "../../../repositories/IOSDetalhesRepository";
import { IFindOSDetalhesRequestDTO, IFindOSDetalhesResponseDTO } from "./FindOSDetalhesDTO";

export class FindOSDetalhesUC {
    constructor(
        private osDetalhesRepository: IOSDetalhesRepository,
    ) {}

    async execute(data: IFindOSDetalhesRequestDTO): Promise<IFindOSDetalhesResponseDTO> {
        try {
            const osDetalhes: OSDetalhes = await this.osDetalhesRepository.findByOrdemServico(data.idOrdemServico);

            if (osDetalhes == null || osDetalhes == undefined) {
                return null;
            }

            return osDetalhes;
        } catch(error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}