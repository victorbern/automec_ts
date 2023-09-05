import { Produto_has_OSDetalhes } from "../../entities/ProdutoHasOSDetalhes";
import { IProdutoHasOSDetalhesRepository } from "../IProdutoHasOSDetalhesRepository";

export class InMemoryProdutoHasOSDetalhesRepository implements IProdutoHasOSDetalhesRepository {
    public items: Produto_has_OSDetalhes[] = [{
        idOSDetalhes: 1,
        codigoBarras: "21321232",
        quantidadeVendida: 2,
        precoTotal: 60,
        precoUnitario: 30
    }]

    async save(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void> {
        this.items.push(produtoHasOSDetalhes);
    }
}