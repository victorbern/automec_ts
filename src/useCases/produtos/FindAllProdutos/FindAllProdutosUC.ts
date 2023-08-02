import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindAllProdutosResponseDTO } from "./FindAllProdutosDTO";

export class FindAllProdutosUC {
    constructor(
        private produtosRepository: IProdutosRepository
    ) {}

    async execute(): Promise<IFindAllProdutosResponseDTO[]> {
        const produtos = await this.produtosRepository.findAll();
        return produtos;
    }
}