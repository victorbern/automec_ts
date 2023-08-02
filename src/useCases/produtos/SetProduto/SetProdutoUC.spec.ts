import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { SetProdutoUC } from "./SetProdutoUC";

describe("Set Produto", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const setProduto = new SetProdutoUC(mySqlProdutos);

    it("should be able to set a product", () => {
        // Cria um produto no banco de dados para teste
        mySqlProdutos.items.push({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })

        // Tenta alterar os dados do produto que acabamos de criar
        expect(setProduto.execute({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 21,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        }).then(() => {
            // Verifica através do valor de custo se os dados do produto foram alterados
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).valorCusto).toBe(21);
        })).resolves
    })

    it("should not be able to set a product", () => {
        // Tenta alterar os dados de produto sem passar um código de barras
        expect(setProduto.execute({
            codigoBarras: "",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('There are missing fields');

        // Tenta alterar os dados de produto sem passar uma descrição
        expect(setProduto.execute({
            codigoBarras: "1",
            descricao: "",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('There are missing fields');

        // Tenta alterar os dados de produto sem passar um preço de venda
        expect(setProduto.execute({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: null
        })).rejects.toThrow('There are missing fields');

        // Tenta alterar os dados de um produto que não existe (código de barras não encontrado)
        expect(setProduto.execute({
            codigoBarras: "2",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('Product not found');
    })
})