import { Produto_Has_VendaDireta } from "../entities/ProdutoHasVendaDireta";

export interface IProdutoHasVendaDiretaRepository {
    save(produtoHasVendaDireta: Produto_Has_VendaDireta): Promise<void>;
    findByVendaDireta(idVendaDireta: number): Promise<Produto_Has_VendaDireta[]>;
    findUnique(idVendaDireta: number, codigoBarras: string): Promise<Produto_Has_VendaDireta>;
    delete(idVendaDireta: number, codigoBarras: string): Promise<void>;
}