import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { SetEstoqueProdutoUC } from "./SetEstoqueProdutoUC";

describe("Set Estoque Produto", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const setEstoqueProdutoUC = new SetEstoqueProdutoUC(mySqlProdutos);

    mySqlProdutos.items = [
        {
            codigoBarras: "1",
            descricao: "Oleo",
            valorCusto: 21,
            quantidadeEstoque: 54,
            precoVenda: 30
        },
        {
            codigoBarras: "2",
            descricao: "Lubrificante",
            valorCusto: 30,
            quantidadeEstoque: 50,
            precoVenda: 35
        }
    ];

    it("should be able to set a product's stock", () => {

        // Adiciona de um produto ao estoque
        expect(setEstoqueProdutoUC.execute({codigoBarras: "1", valorAlteracao: 3}).then(() => {
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "1") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(57);
        })).resolves;

        // Tira um produto do estoque
        expect(setEstoqueProdutoUC.execute({codigoBarras: "2", valorAlteracao: -2}).then(() => {
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "2") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(48);
            
        })).resolves;
    });

    it("should not be able to set a product's stock", () => {
        expect(setEstoqueProdutoUC.execute({codigoBarras: "", valorAlteracao: 3})).rejects.toThrow("Campos faltando");
        expect(setEstoqueProdutoUC.execute({codigoBarras: "2", valorAlteracao: null})).rejects.toThrow("Campos faltando");

        // Tenta mudar o estoque de um produto que não existe
        expect(setEstoqueProdutoUC.execute({codigoBarras: "3", valorAlteracao: 2})).rejects.toThrow("Produto não encontrado");
        
    })
})