import { OSDetalhes } from "../../../entities/OSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IOSDetalhesRepository } from "../../../repositories/IOSDetalhesRepository";
import { ICreateOSDetalhesRequestDTO, ICreateOSDetalhesResponseDTO } from "./CreateOSDetalhesDTO";

export class CreateOSDetalhesUC {
    constructor(
        private osDetalhesRepository: IOSDetalhesRepository,
    ) {}

    async execute(data: ICreateOSDetalhesRequestDTO): Promise<ICreateOSDetalhesResponseDTO> {
        try {
            const idOrdemServico = data.idOrdemServico;
            let dataOS = data.dataOS;

            if (!idOrdemServico) {
                throw new AppError("Campos faltando", 400);
            }

            if (!dataOS) {
                dataOS = new Date(Date.now());
            }

            const osDetalhes = new OSDetalhes({dataOS, idOrdemServico});

            const idOSDetalhes = await this.osDetalhesRepository.save(osDetalhes);

            return Promise.resolve({idOSDetalhes});
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}