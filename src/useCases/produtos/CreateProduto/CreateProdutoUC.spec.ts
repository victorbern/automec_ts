import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindProdutoUC } from "../FindProduto/FindProdutoUC";
import { CreateProdutoUC } from "./CreateProdutoUC";

describe("Create Veiculo", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const createProduto = new CreateProdutoUC(mySqlProdutos);

    it("should be able to create a product", () => {
        // Cria um produto para ver se está salvando no banco de dados
        expect(createProduto.execute({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        }).then(() => {
            // Procura no banco para ver se o produto foi salvo mesmo
            // Testa para ver se o código de barras confere
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).codigoBarras).toBe("1");

            // Testa para ver se a descrição confere
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).descricao).toBe("Óleo para Motor");

            // Testa para ver se o valor de custo esta batendo
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).valorCusto).toBe(18.96);

            // Testa para ver se a quantidade no estoque está batendo
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(45);

            // Testa para ver se o preco de venda está batendo
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras === "1") {
                    return produto;
                }
            }).precoVenda).toBe(36.92);
        })).resolves
    })

    it("should not be able to create a product", () => {
        // Tenta criar um produto com o código de barras faltando (é para falhar)
        expect(createProduto.execute({
            codigoBarras: "",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('There are missing fields');

        // Tenta criar um produto com a descrição faltando (é para falhar)
        expect(createProduto.execute({
            codigoBarras: "1",
            descricao: "",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('There are missing fields');

        // Tenta criar um produto com o preço de venda faltando (é para falhar)
        expect(createProduto.execute({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: null
        })).rejects.toThrow('There are missing fields');

        // Tenta criar um produto com um código de barras que já existe (é para falhar)
        expect(createProduto.execute({
            codigoBarras: "1",
            descricao: "Óleo para Motor",
            valorCusto: 18.96,
            quantidadeEstoque: 45,
            precoVenda: 36.92
        })).rejects.toThrow('The codigoBarras already exists');
    })
})