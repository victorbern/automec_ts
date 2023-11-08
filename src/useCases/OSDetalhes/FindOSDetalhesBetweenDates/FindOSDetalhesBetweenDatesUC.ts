import { OSDetalhes } from "../../../entities/OSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IOSDetalhesRepository } from "../../../repositories/IOSDetalhesRepository";
import { IFindOSDetalhesBetweenDatesRequestDTO, IFindOSDetalhesBetweenDatesResponseDTO } from "./FindOSDetalhesBetweenDatesDTO";

export class FindOSDetalhesBetweenDatesUC {
    constructor(
        private osDetalhesRepository: IOSDetalhesRepository,
    ) {}

    async execute(data: IFindOSDetalhesBetweenDatesRequestDTO): Promise<IFindOSDetalhesBetweenDatesResponseDTO[]> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }

            let osDetalhesList: OSDetalhes[] = await this.osDetalhesRepository.findBetweenDates(dataDe, dataAte);

            return osDetalhesList;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}