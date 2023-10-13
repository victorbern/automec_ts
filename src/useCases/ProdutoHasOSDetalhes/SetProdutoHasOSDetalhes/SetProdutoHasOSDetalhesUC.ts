import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasOSDetalhesRepository } from "../../../repositories/IProdutoHasOSDetalhesRepository";
import { ISetProdutoHasOSDetalhesRequestDTO } from "./SetProdutoHasOSDetalhesDTO";

export class SetProdutoHasOSDetalhesUC {
    constructor(
        private produtoHasOSDetalhesRepository: IProdutoHasOSDetalhesRepository,
    ) { }

    async execute(data: ISetProdutoHasOSDetalhesRequestDTO) {
        try {
            const { idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario } = data;

            if (!idOSDetalhes || !codigoBarras || !quantidadeVendida || !precoTotal || !precoUnitario) {
                throw new AppError("Campos faltando", 400);
            }

            let produtoHasOSDetalhesExist = await this.produtoHasOSDetalhesRepository.findUnique(idOSDetalhes, codigoBarras);

            if (!produtoHasOSDetalhesExist) {
                throw new AppError("A venda a ser alterada não foi encontrada", 400)
            }

            let produtoHasOSDetalhes = new Produto_has_OSDetalhes({
                idOSDetalhes,
                codigoBarras,
                quantidadeVendida,
                precoTotal,
                precoUnitario
            })
            await this.produtoHasOSDetalhesRepository.update(produtoHasOSDetalhes);


        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}