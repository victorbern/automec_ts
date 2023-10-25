import { Produto_Has_VendaDireta } from "../../../entities/ProdutoHasVendaDireta";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasVendaDiretaRepository } from "../../../repositories/IProdutoHasVendaDiretaRepository";
import { ICreateProdutoHasVendaDiretaRequestDTO } from "./CreateProdutoHasVendaDiretaDTO";

export class CreateProdutoHasVendaDiretaUC {
    constructor(
        private produtoHasVendaDiretaRepository: IProdutoHasVendaDiretaRepository,
    ) {}

    async execute(data: ICreateProdutoHasVendaDiretaRequestDTO): Promise<void> {
        try {
            const { codigoBarras, idVendaDireta, quantidadeVendida, precoTotal, precoUnitario } = data;

            if (!codigoBarras || !idVendaDireta || !quantidadeVendida || !precoTotal || !precoUnitario) {
                throw new AppError("Campos faltando", 400);
            }

            const produtoHasVendaDireta = new Produto_Has_VendaDireta({
                codigoBarras, idVendaDireta, quantidadeVendida, precoTotal, precoUnitario
            });

            await this.produtoHasVendaDiretaRepository.save(produtoHasVendaDireta);


        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}