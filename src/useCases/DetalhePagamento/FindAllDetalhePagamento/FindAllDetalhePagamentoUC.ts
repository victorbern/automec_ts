import { DetalhePagamento } from "../../../entities/DetalhePagamento";
import { AppError } from "../../../errors/AppError";
import { IDetalhePagamentoRepository } from "../../../repositories/IDetalhePagamentoRepository";
import { IFindAllDetalhePagamentoRequestDTO, IFindAllDetalhePagamentoResponseDTO } from "./FindAllDetalhePagamentoDTO";

export class FindAllDetalhePagamentoUC {
    constructor(
        private detalhePagamentoRepository: IDetalhePagamentoRepository,
    ) {}

    async execute(data: IFindAllDetalhePagamentoRequestDTO): Promise<IFindAllDetalhePagamentoResponseDTO[]> {
        try {
            const detalhePagamentoList: DetalhePagamento[] = await this.detalhePagamentoRepository.findByPagamento(data.idPagamento);

            return detalhePagamentoList;

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}