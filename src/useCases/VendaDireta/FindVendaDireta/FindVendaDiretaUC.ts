import { VendaDireta } from "../../../entities/VendaDireta";
import { AppError } from "../../../errors/AppError";
import { IVendaDiretaRepository } from "../../../repositories/IVendaDiretaRepository";
import { IFindVendaDiretaRequestDTO, IFindVendaDiretaResponseDTO } from "./FindVendaDiretaDTO";

export class FindVendaDiretaUC {
    constructor(
        private vendaDiretaRepository: IVendaDiretaRepository,
    ) {}

    async execute(data: IFindVendaDiretaRequestDTO): Promise<IFindVendaDiretaResponseDTO> {
        try {
            const idPagamento = data.idPagamento;

            if (!idPagamento) {
                throw new AppError("Campos faltando", 400);
            }

            const vendaDireta: VendaDireta = await this.vendaDiretaRepository.findById(data.idPagamento);

            if (vendaDireta == null || vendaDireta == undefined) {
                return null;
            }

            return vendaDireta;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}