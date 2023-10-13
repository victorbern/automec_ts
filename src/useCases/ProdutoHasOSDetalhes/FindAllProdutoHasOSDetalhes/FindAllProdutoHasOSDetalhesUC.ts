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
            const { idOSDetalhes } = data;
            if (!idOSDetalhes) {
                throw new AppError("Campos faltando", 400);
            }
            const produtoHasOSDetalhesList: Produto_has_OSDetalhes[] = await this.produtoHasOSDetalhesRepository.findByOSDetalhes(idOSDetalhes);
            return produtoHasOSDetalhesList;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}