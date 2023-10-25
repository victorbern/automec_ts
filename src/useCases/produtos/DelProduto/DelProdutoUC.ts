import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IDelProdutoRequestDTO } from "./DelProdutoDTO";

export class DelProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IDelProdutoRequestDTO): Promise<void> {
        try {
            // Verificar se o código de barras fornecido não é nulo
            const codigoBarras = data.codigoBarras;

            if (!codigoBarras) {
                throw new AppError("Campos faltando", 400);
            }

            // Verificar se o produto existe
            const produtoExists = await this.produtosRepository.findByCodigoBarras(codigoBarras);

            if (!produtoExists) {
                throw new AppError("Produto não encontrado", 400);
            }

            await this.produtosRepository.delete(codigoBarras);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected Error!")
            }
        }
    }
}