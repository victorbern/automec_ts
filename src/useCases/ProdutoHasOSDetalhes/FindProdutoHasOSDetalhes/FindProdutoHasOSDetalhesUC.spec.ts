import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindProdutoHasOSDetalhesUC } from "./FindProdutoHasOSDetalhesUC";

describe("Find ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findProdutoHasOSDetalhes = new FindProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    mySqlProdutoHasOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            codigoBarras: "1",
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30
        },
        {
            idOSDetalhes: 2,
            codigoBarras: "2",
            quantidadeVendida: 3,
            precoTotal: 30,
            precoUnitario: 10
        }
    ];

    it("should be able to find a ProdutoHasOSDetalhes", () => {
        expect(findProdutoHasOSDetalhes.execute({idOSDetalhes: 1, codigoBarras: "1"})).resolves.toStrictEqual({
            idOSDetalhes: 1,
            codigoBarras: "1",
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30
        });
    });

    it("should not be able to find a ProdutoHasOSDetalhes", () => {
        expect(findProdutoHasOSDetalhes.execute({idOSDetalhes: null, codigoBarras: "1"})).rejects.toThrow("Campos faltando");
        expect(findProdutoHasOSDetalhes.execute({idOSDetalhes: 1, codigoBarras: ""})).rejects.toThrow("Campos faltando");

        expect(findProdutoHasOSDetalhes.execute({idOSDetalhes: 3, codigoBarras: "3"})).resolves.toBeNull();
    });
});