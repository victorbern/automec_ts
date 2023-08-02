import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { ISetProdutoRequestDTO } from "./SetProdutoDTO";

export class SetProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository
    ) {}

    async execute(data: ISetProdutoRequestDTO): Promise<void> {
        try {
            if (!data.codigoBarras || !data.descricao || !data.precoVenda) {
                throw new AppError('There are missing fields', 400);
            }

            const produtoExists = await this.produtosRepository.findByCodigoBarras(data.codigoBarras);
            if (!produtoExists) {
                throw new AppError('Product not found', 400);
            }

            const produto = new Produto(data);
            await this.produtosRepository.update(produto);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError('Unexpected error', 500);
            }
        }
    }
}