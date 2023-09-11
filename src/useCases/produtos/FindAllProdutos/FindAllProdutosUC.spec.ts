import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindAllProdutosUC } from "./FindAllProdutosUC";
import { Produto } from "../../../entities/Produto";

describe("Find All Produtos", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const findAllProdudos = new FindAllProdutosUC(mySqlProdutos);

    // Limpando o banco de dados para teste
    mySqlProdutos.items = [];

    // Inserindo alguns produtos no banco de dados para teste
    mySqlProdutos.items.push({
        codigoBarras: "1",
        descricao: "Oleo",
        valorCusto: 21,
        quantidadeEstoque: 54,
        precoVenda: 30
    })

    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Limpa Auto",
        valorCusto: 21,
        quantidadeEstoque: 54,
        precoVenda: 30
    })

    mySqlProdutos.items.push({
        codigoBarras: "3",
        descricao: "Oleo",
        valorCusto: 21,
        quantidadeEstoque: 54,
        precoVenda: 30
    })

    it("should be able to find all products without using filter", () => {
        // Busca todos os produtos e compara com os dados do banco de dados
        expect(findAllProdudos.execute({ filtro: null })).resolves.toBe(mySqlProdutos.items);
        expect(findAllProdudos.execute({})).resolves.toHaveLength(3);
    });

    it("should be able to find some products using filter", () => {
        // Testando filtro pelo código de barras
        expect(findAllProdudos.execute({ filtro: "2" })).resolves.toStrictEqual(
            [
                {
                    codigoBarras: "2",
                    descricao: "Limpa Auto",
                    valorCusto: 21,
                    quantidadeEstoque: 54,
                    precoVenda: 30
                }
            ]
        );

        // Testando filtro pela descrição do produto
        expect(findAllProdudos.execute({ filtro: "Ole" })).resolves.toStrictEqual(
            [
                {
                    codigoBarras: "1",
                    descricao: "Oleo",
                    valorCusto: 21,
                    quantidadeEstoque: 54,
                    precoVenda: 30
                },
                {
                    codigoBarras: "3",
                    descricao: "Oleo",
                    valorCusto: 21,
                    quantidadeEstoque: 54,
                    precoVenda: 30
                }
            ]
        );
    })

    it("should not be able to find any product using filter", () => {
        // Testando a busca de todos os produtos com um filtro que não existe
        expect(findAllProdudos.execute({ filtro: "Fluido" })).resolves.toHaveLength(0);
    })

    it("should not be able to find any product without using filter", () => {
        mySqlProdutos.items = [];

        // Busca todos os produtos (com a base zerada) e verifica se não houve erros
        expect(findAllProdudos.execute({ filtro: null })).resolves.toStrictEqual([]);
    })
})