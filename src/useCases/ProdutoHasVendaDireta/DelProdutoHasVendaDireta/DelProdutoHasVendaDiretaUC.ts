import { AppError } from "../../../errors/AppError";
import { IProdutoHasVendaDiretaRepository } from "../../../repositories/IProdutoHasVendaDiretaRepository";
import { IVendaDiretaRepository } from "../../../repositories/IVendaDiretaRepository";
import { IDelProdutoHasVendaDiretaRequestDTO } from "./DelProdutoHasVendaDiretaDTO";

export class DelProdutoHasVendaDiretaUC {
    constructor(
        private produtoHasVendaDiretaRepository: IProdutoHasVendaDiretaRepository,
    ) {}

    async execute(data: IDelProdutoHasVendaDiretaRequestDTO): Promise<void> {
        try {
            const idVendaDireta = data.idVendaDireta;
            const codigoBarras = data.codigoBarras;

            if (!idVendaDireta || !codigoBarras) {
                throw new AppError("Campos faltando", 400);
            }

            const produtoHasVendaDiretaExists = await this.produtoHasVendaDiretaRepository.findUnique(idVendaDireta, codigoBarras);

            if (produtoHasVendaDiretaExists) {
                await this.produtoHasVendaDiretaRepository.delete(idVendaDireta, codigoBarras);
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