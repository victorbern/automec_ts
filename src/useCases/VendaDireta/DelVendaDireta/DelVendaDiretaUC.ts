import { AppError } from "../../../errors/AppError";
import { IVendaDiretaRepository } from "../../../repositories/IVendaDiretaRepository";
import { IDelVendaDiretaRequestDTO } from "./DelVendaDiretaDTO";

export class DelVendaDiretaUC {
    constructor(
        private vendaDiretaRepository: IVendaDiretaRepository,
    ) {}

    async execute(data: IDelVendaDiretaRequestDTO): Promise<void> {
        try {
            const idVendaDireta = data.idVendaDireta;

            if (!idVendaDireta) {
                throw new AppError("Campos faltando", 400);
            }

            const vendaDiretaExists = await this.vendaDiretaRepository.findById(idVendaDireta);

            if (vendaDiretaExists) {
                await this.vendaDiretaRepository.delete(idVendaDireta);
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