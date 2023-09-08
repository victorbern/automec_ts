import { OSDetalhes } from "../../entities/OSDetalhes";
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

    async findByOSDetalhes(idOSDetalhes: number): Promise<Produto_has_OSDetalhes[]> {
        
        let osDetalhesList: Produto_has_OSDetalhes[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes === idOSDetalhes) {
                osDetalhesList.push(this.items[i]);
            }
        }

        return osDetalhesList;
    }
}