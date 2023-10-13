import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { ICreateProdutoHasOSDetalhesRequestDTO } from "./CreateProdutoHasOSDetalhesDTO";

export class CreateProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhesRepository: IProdutoHasOSDetalhesRepository,
    ) {}

    async execute(data: ICreateProdutoHasOSDetalhesRequestDTO): Promise<void> {

        try {
            const { idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario } = data;
            if (!idOSDetalhes || !codigoBarras || !quantidadeVendida || !precoTotal || !precoUnitario) {
                throw new AppError("Campos faltando", 400);
            }
            
            const produtoHasOSDetalhes = new Produto_has_OSDetalhes({idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario});
            await this.produtoHasOSDetalhesRepository.save(produtoHasOSDetalhes);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}