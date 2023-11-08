import { AppError } from "../../../errors/AppError";
import { IVendaDiretaRepository } from "../../../repositories/IVendaDiretaRepository";
import { IFindVendaDiretaBetweenDatesRequestDTO, IFindVendaDiretaBetweenDatesResponseDTO } from "./FindVendaDiretaBetweenDatesDTO";

export class FindVendaDiretaBetweenDatesUC {
    constructor(
        private vendaDiretaRepository: IVendaDiretaRepository,
    ) {}

    async execute(data: IFindVendaDiretaBetweenDatesRequestDTO): Promise<IFindVendaDiretaBetweenDatesResponseDTO[]> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }

            let vendaDiretaResult = this.vendaDiretaRepository.findBetweenDates(dataDe, dataAte);

            return vendaDiretaResult;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}