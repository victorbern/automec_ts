import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { IFindProdutoHasOSDetalhesRequestDTO, IFindProdutoHasOSDetalhesResponseDTO } from "./FindProdutoHasOSDetalhesDTO";

export class FindProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhesRepository: IProdutoHasOSDetalhesRepository
    ) {}

    async execute(data: IFindProdutoHasOSDetalhesRequestDTO): Promise<IFindProdutoHasOSDetalhesResponseDTO> {
        try {
            const { idOSDetalhes, codigoBarras } = data;

            if (!idOSDetalhes || !codigoBarras) {
                throw new AppError("Campos faltando", 400);
            }

            const produtoHasOSDetalhes = await this.produtoHasOSDetalhesRepository.findUnique(idOSDetalhes, codigoBarras);
            
            if (produtoHasOSDetalhes == null || produtoHasOSDetalhes == undefined) {
                return null;
            }

            return produtoHasOSDetalhes;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}