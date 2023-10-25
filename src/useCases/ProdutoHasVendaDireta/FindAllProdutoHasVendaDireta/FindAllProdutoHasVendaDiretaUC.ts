import { Produto_Has_VendaDireta } from "../../../entities/ProdutoHasVendaDireta";
import { AppError } from "../../../errors/AppError";
import { IProdutoHasVendaDiretaRepository } from "../../../repositories/IProdutoHasVendaDiretaRepository";
import { IFindAllProdutoHasVendaDiretaRequestDTO, IFindAllProdutoHasVendaDiretaResponseDTO } from "./FindAllProdutoHasVendaDiretaDTO";

export class FindAllProdutoHasVendaDiretaUC {
    constructor(
        private produtoHasVendaDiretaRepository: IProdutoHasVendaDiretaRepository,
    ) {}

    async execute(data: IFindAllProdutoHasVendaDiretaRequestDTO): Promise<IFindAllProdutoHasVendaDiretaResponseDTO[]> {
        try {
            const idVendaDireta = data.idVendaDireta;

            if (!idVendaDireta) {
                throw new AppError("Campos faltando", 400);
            }

            const produtoHasVendaDiretaList: Produto_Has_VendaDireta[] = await this.produtoHasVendaDiretaRepository.findByVendaDireta(idVendaDireta);

            return produtoHasVendaDiretaList;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}