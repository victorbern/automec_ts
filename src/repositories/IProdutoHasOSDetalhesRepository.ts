import { Produto_has_OSDetalhes } from "../entities/ProdutoHasOSDetalhes";

export interface IProdutoHasOSDetalhesRepository {
    save(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void>;
    findByOSDetalhes(idOSDetalhes: number): Promise<Produto_has_OSDetalhes[]>;
}