import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { IFindAllProdutoHasOSDetalhesRequestDTO, IFindAllProdutoHasOSDetalhesResponseDTO } from "./FindAllProdutoHasOSDetalhesDTO";

export class FindAllProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhesRepository: IProdutoHasOSDetalhesRepository,
    ) {}

    async execute(data: IFindAllProdutoHasOSDetalhesRequestDTO): Promise<IFindAllProdutoHasOSDetalhesResponseDTO[]> {
        try {
            const produtoHasOSDetalhes: Produto_has_OSDetalhes[] = await this.produtoHasOSDetalhesRepository.findByOSDetalhes(data.idOSDetalhes);
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