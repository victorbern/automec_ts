import { AppError } from "../../../errors/AppError";
import { IOSDetalhesRepository } from "../../../repositories/IOSDetalhesRepository";
import { IDelOSDetalhesRequestDTO } from "./DelOSDetalhesDTO";

export class DelOSDetalhesUC {
    constructor(
        private osDetalhesRepository: IOSDetalhesRepository,
    ) {}

    async execute(data: IDelOSDetalhesRequestDTO) {
        try {
            const { idOSDetalhes } = data;
            
            if (!idOSDetalhes) {
                throw new AppError("Campos faltando!", 400);
            }

            const osDetalhesExists = await this.osDetalhesRepository.findById(idOSDetalhes);

            if (osDetalhesExists) {
                await this.osDetalhesRepository.delete(idOSDetalhes);
            }

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}