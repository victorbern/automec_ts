import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { ICreateProdutoRequestDTO } from "./CreateProdutoDTO";

export class CreateProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: ICreateProdutoRequestDTO): Promise<void> {
        try {
            if (!data.codigoBarras || !data.descricao || !data.precoVenda) {
                throw new AppError('Campos faltando', 400);
            }

            const produtoAlreadyExists = await this.produtosRepository.findByCodigoBarras(data.codigoBarras);
            if (produtoAlreadyExists) {
                throw new AppError('O código de barras já foi cadastrado', 400);
            }

            const produto = new Produto(data);
            await this.produtosRepository.save(produto);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError('Unexpected error', 500);
            }
        }
    }
}