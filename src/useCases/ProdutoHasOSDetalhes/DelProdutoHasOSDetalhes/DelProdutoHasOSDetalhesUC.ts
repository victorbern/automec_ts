import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { IDelProdutoHasOSDetalhesRequestDTO } from "./DelProdutoHasOSDetalhesDTO";

export class DelProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhesRepository: IProdutoHasOSDetalhesRepository,
    ) {}

    async execute(data: IDelProdutoHasOSDetalhesRequestDTO) {
        try {
            let { idOSDetalhes, codigoBarras } = data;

            if (!idOSDetalhes || !codigoBarras) {
                throw new AppError("Campos faltando", 400);
            }

            let produtoHasOSDetalhesExist = await this.produtoHasOSDetalhesRepository.findUnique(idOSDetalhes, codigoBarras);

            if (produtoHasOSDetalhesExist) {
                await this.produtoHasOSDetalhesRepository.delete(idOSDetalhes, codigoBarras);
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