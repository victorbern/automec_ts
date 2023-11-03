import { Pagamento } from "../../../entities/Pagamento";
import { AppError } from "../../../errors/AppError";
import { IPagamentosRepository } from "../../../repositories/IPagamentosRepository";
import { IFindPagamentosBetweenDatesRequestDTO, IFindPagamentosBetweenDatesResponseDTO } from "./FindPagamentosBetweenDatesDTO";

export class FindPagamentosBetweenDatesUC {
    constructor(
        private pagamentosRepository: IPagamentosRepository,
    ) {}

    async execute(data: IFindPagamentosBetweenDatesRequestDTO): Promise<IFindPagamentosBetweenDatesResponseDTO[]> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;

            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }

            let pagamentos: Pagamento[] = await this.pagamentosRepository.findBetweenDates(dataDe, dataAte);

            return pagamentos;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }

    }
}