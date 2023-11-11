import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindProdutoRequestDTO, IFindProdutoResponseDTO } from "./FindProdutoDTO";

export class FindProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository
    ) {}

    async execute(data: IFindProdutoRequestDTO): Promise<IFindProdutoResponseDTO> {
        try {
            const result = await this.produtosRepository.findByCodigoBarras(data.codigoBarras);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}