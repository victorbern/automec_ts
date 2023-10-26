import { AppError } from "../../../errors/AppError";
import { IDetalhePagamentoRepository } from "../../../repositories/IDetalhePagamentoRepository";
import { IDelDetalhePagamentoRequestDTO } from "./DelDetalhePagamentoDTO";

export class DelDetalhePagamentoUC {
    constructor(
        private detalhePagamentoRepository: IDetalhePagamentoRepository,
    ) {}

    async execute(data: IDelDetalhePagamentoRequestDTO): Promise<void> {
        try {
            const idDetalhePagamento = data.idDetalhePagamento;

            if (!idDetalhePagamento) {
                throw new AppError("Campos faltando", 400);
            }

            const detalhePagamentoExists = await this.detalhePagamentoRepository.findById(idDetalhePagamento);

            if (detalhePagamentoExists) {
                await this.detalhePagamentoRepository.delete(idDetalhePagamento);
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