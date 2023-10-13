import { Produto_has_OSDetalhes } from "../entities/ProdutoHasOSDetalhes";

export interface IProdutoHasOSDetalhesRepository {
    save(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void>;
    findByOSDetalhes(idOSDetalhes: number): Promise<Produto_has_OSDetalhes[]>;
    findUnique(idOSDetalhes: number, codigoBarras: string): Promise<Produto_has_OSDetalhes>;
    update(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void>;
    delete(idOSDetalhes: number, codigoBarras: string): Promise<void>;
}