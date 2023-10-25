import { VendaDireta } from "../../../entities/VendaDireta";
import { AppError } from "../../../errors/AppError";
import { IVendaDiretaRepository } from "../../../repositories/IVendaDiretaRepository";
import { ICreateVendaDiretaRequestDTO, ICreateVendaDiretaResponseDTO } from "./CreateVendaDiretaDTO";

export class CreateVendaDiretaUC {
    constructor(
        private vendaDiretaRepository: IVendaDiretaRepository,
    ) {}

    async execute(data: ICreateVendaDiretaRequestDTO): Promise<ICreateVendaDiretaResponseDTO> {
        try {
            const idPagamento = data.idPagamento;
            const total = data.total;
            let dataHora = data.dataHora;

            if (!idPagamento) {
                throw new AppError("Campos faltando", 400);
            }
            if (!dataHora) {
                dataHora = new Date(Date.now());
            }

            const vendaDireta = new VendaDireta({idPagamento, total, dataHora});
            const idVendaDireta = await this.vendaDiretaRepository.save(vendaDireta);

            return { idVendaDireta };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}