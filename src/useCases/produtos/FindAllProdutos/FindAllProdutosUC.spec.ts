import { describe, expect, it } from "vitest";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindAllProdutosUC } from "./FindAllProdutosUC";

describe("Find All Produtos", () => {
    const mySqlProdutos = new InMemoryProdutosRepository;
    const findAllProdudos = new FindAllProdutosUC(mySqlProdutos);

    it("should be able to find all products", () => {
        // Busca todos os produtos e compara com os dados do banco de dados
        expect(findAllProdudos.execute({filtro: null})).resolves.toBe(mySqlProdutos.items);
    });

    it("should not be able to find any product", () => {
        mySqlProdutos.items = [];

        // Busca todos os produtos (com a base zerada) e verifica se não houve erros
        expect(findAllProdudos.execute({filtro: null})).resolves.toStrictEqual([]);
    })
})