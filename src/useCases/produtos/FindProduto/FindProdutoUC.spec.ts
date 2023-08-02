import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindProdutoUC } from "./FindProdutoUC";

describe("Find Produto", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const findProduto = new FindProdutoUC(mySqlProdutos);

    // Cria um produto no banco de dados para teste
    mySqlProdutos.items.push({
        codigoBarras: "1",
        descricao: "Óleo para Motor",
        valorCusto: 18.96,
        quantidadeEstoque: 45,
        precoVenda: 36.92
    })

    it("should be able to find a product", () => {
        // Tenta procurar pelo produto recém criado no banco de dados
        expect(findProduto.execute({ codigoBarras: "1" })).resolves.toBe(
            mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            })
        )
    })

    it("should not be able to find a product", () => {
        // Apaga o último produto salvo no banco
        mySqlProdutos.items.pop();
        // Tenta buscar pelo produto deletado (deve retornar null)
        expect(findProduto.execute({ codigoBarras: "1" })).resolves.toBeNull();
    })
})