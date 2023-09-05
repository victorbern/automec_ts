import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { ICreateProdutoHasOSDetalhesRequestDTO } from "./CreateProdutoHasOSDetalhesDTO";

export class CreateProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhes: IProdutoHasOSDetalhesRepository,
    ) {}

    async execute(data: ICreateProdutoHasOSDetalhesRequestDTO): Promise<void> {

        try {
            const { idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario } = data;
    
            const produtoHasOSDetalhes = new Produto_has_OSDetalhes({idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario});
            await this.produtoHasOSDetalhes.save(produtoHasOSDetalhes);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}