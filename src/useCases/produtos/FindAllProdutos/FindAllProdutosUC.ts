import { Produto } from "../../../entities/Produto";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindAllProdutosRequestDTO, IFindAllProdutosResponseDTO } from "./FindAllProdutosDTO";

export class FindAllProdutosUC {
    constructor(
        private produtosRepository: IProdutosRepository
    ) {}

    async execute(data: IFindAllProdutosRequestDTO): Promise<IFindAllProdutosResponseDTO[]> {
        let produtos: Produto[] = [];
        if (!data.filtro) {
            produtos = await this.produtosRepository.findAll();
        } else {
            produtos = await this.produtosRepository.findAllWithFilter(data.filtro);
        }
        return produtos;
    }
}