import { DetalhePagamento } from "../../../entities/DetalhePagamento";
import { AppError } from "../../../errors/AppError";
import { IDetalhePagamentoRepository } from "../../../repositories/IDetalhePagamentoRepository";
import { ICreateDetalhePagamentoRequestDTO } from "./CreateDetalhePagamentoDTO";

export class CreateDetalhePagamentoUC {
    constructor(
        private detalhePagamentoRepository: IDetalhePagamentoRepository,
    ) {}

    async execute(data: ICreateDetalhePagamentoRequestDTO): Promise<void> {
        try {
            const { idOrdemServico, idPagamento } = data;

            if (!idOrdemServico || !idPagamento) {
                throw new AppError("Campos faltando", 400);
            }

            const detalhePagamento = new DetalhePagamento({idOrdemServico, idPagamento});

            await this.detalhePagamentoRepository.save(detalhePagamento);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}