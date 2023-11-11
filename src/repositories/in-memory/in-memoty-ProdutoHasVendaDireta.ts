import { Produto_Has_VendaDireta } from "../../entities/ProdutoHasVendaDireta";
import { IProdutoHasVendaDiretaRepository } from "../IProdutoHasVendaDiretaRepository";

export class InMemoryProdutoHasVendaDireta implements IProdutoHasVendaDiretaRepository {
    public items: Produto_Has_VendaDireta[] = [
        {
            codigoBarras: "1",
            idVendaDireta: 1,
            quantidadeVendida: 2,
            precoTotal: 30,
            precoUnitario: 15
        }
    ]

    async save(produtoHasVendaDireta: Produto_Has_VendaDireta): Promise<void> {
        this.items.push(produtoHasVendaDireta);
    }

    async findByVendaDireta(idVendaDireta: number): Promise<Produto_Has_VendaDireta[]> {
        const vendaDiretaList: Produto_Has_VendaDireta[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta === idVendaDireta) {
                vendaDiretaList.push(this.items[i]);
            }
        }

        return vendaDiretaList;
    }

    async findUnique(idVendaDireta: number, codigoBarras: string): Promise<Produto_Has_VendaDireta> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta == idVendaDireta && this.items[i].codigoBarras == codigoBarras) {
                return this.items[i];
            }
        }

        return null;
    }

    async delete(idVendaDireta: number, codigoBarras: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta == idVendaDireta && this.items[i].codigoBarras == codigoBarras) {
                this.items.splice(i, 1);
            }
        }
    }
}