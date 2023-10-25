import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { DelProdutoUC } from "./DelProdutoUC";

describe("Delete a product", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const delProdutoUC = new DelProdutoUC(mySqlProdutos);

    // Cria um produto para testes
    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Limpa Auto Super Concentrado",
        valorCusto: 30,
        quantidadeEstoque: 30,
        precoVenda: 40,
    })

    it("should be able to delete a product", () => {
        // Tenta deletar o produto recém criado
        expect(delProdutoUC.execute({codigoBarras: "2"}).then(() => {
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "2") {
                    return produto;
                }
            })).toBe(undefined);
        })).resolves
    })

    it("should not be able to delete a product", () => {
        // Tenta deletar um produto com id nulo
        expect(delProdutoUC.execute({codigoBarras: ""})).rejects.toThrow("Campos faltando")

        // Tenta deletar um produto que não existe
        expect(delProdutoUC.execute({codigoBarras: "3"})).rejects.toThrow("Produto não encontrado")
    })
})