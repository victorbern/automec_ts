import { Produto } from "../../entities/Produto";
import { IProdutosRepository } from "../IProdutosRepository";

export class InMemoryProdutosRepository implements IProdutosRepository {
    public items: Produto[] = [{
        codigoBarras: "21321232",
        descricao: "Oleo",
        valorCusto: 21,
        quantidadeEstoque: 54,
        precoVenda: 30
    }];

    async save(produto: Produto): Promise<void> {
        this.items.push(produto);
    }

    async findAll(): Promise<Produto[]> {
        return this.items;
    }

    async findAllWithFilter(filtro: string): Promise<Produto[]> {
        let produtos: Produto[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoBarras.includes(filtro) || this.items[i].descricao.includes(filtro)) {
                produtos.push(this.items[i]);
            }
        }

        return produtos;
    }

    async findByCodigoBarras(codigoBarras: string): Promise<Produto> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoBarras === codigoBarras) {
                return this.items[i];
            }
        }
        return null;
    }

    async update(produto: Produto): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoBarras === produto.codigoBarras) {
                this.items[i] = {
                    codigoBarras: produto.codigoBarras,
                    descricao: produto.descricao,
                    valorCusto: produto.valorCusto,
                    quantidadeEstoque: produto.quantidadeEstoque,
                    precoVenda: produto.precoVenda,
                }
            }
        }
    }
}