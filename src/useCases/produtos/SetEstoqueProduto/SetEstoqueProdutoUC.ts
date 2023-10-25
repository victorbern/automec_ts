import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { ISetEstoqueProdutoRequestDTO } from "./SetEstoqueProdutoDTO";

export class SetEstoqueProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: ISetEstoqueProdutoRequestDTO): Promise<void> {
        try {
            const codigoBarras = data.codigoBarras;
            const valorAlteracao = data.valorAlteracao;

            if (!codigoBarras || valorAlteracao == null) {
                throw new AppError("Campos faltando", 400);
            }

            const produto = await this.produtosRepository.findByCodigoBarras(codigoBarras);

            if (!produto) {
                throw new AppError("Produto não encontrado", 400);
            }
            
            produto.quantidadeEstoque = produto.quantidadeEstoque + valorAlteracao;

            await this.produtosRepository.update(produto);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}