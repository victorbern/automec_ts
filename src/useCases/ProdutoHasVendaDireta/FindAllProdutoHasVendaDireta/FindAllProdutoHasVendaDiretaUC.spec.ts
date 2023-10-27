import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { FindAllProdutoHasVendaDiretaUC } from "./FindAllProdutoHasVendaDiretaUC";

describe("Find All ProdutoHasVendaDireta", () => {
    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const findAllProdutoHasVendaDireta = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    mySqlProdutoHasVendaDireta.items = [
        {
            codigoBarras: "1",
            idVendaDireta: 1,
            quantidadeVendida: 2,
            precoTotal: 30,
            precoUnitario: 15,
        },
        {
            codigoBarras: "2",
            idVendaDireta: 2,
            quantidadeVendida: 3,
            precoTotal: 60,
            precoUnitario: 20,
        },
        {
            codigoBarras: "3",
            idVendaDireta: 2,
            quantidadeVendida: 4,
            precoTotal: 80,
            precoUnitario: 20,
        },
    ];

    it("should be able to find all ProdutoHasVendaDireta", () => {
        expect(findAllProdutoHasVendaDireta.execute({idVendaDireta: 2})).resolves.toStrictEqual([
            {
                codigoBarras: "2",
                idVendaDireta: 2,
                quantidadeVendida: 3,
                precoTotal: 60,
                precoUnitario: 20,
            },
            {
                codigoBarras: "3",
                idVendaDireta: 2,
                quantidadeVendida: 4,
                precoTotal: 80,
                precoUnitario: 20,
            },
        ]);
    });

    it("should not be able to find any ProdutoHasVendaDireta", () => {
        expect(findAllProdutoHasVendaDireta.execute({idVendaDireta: null})).rejects.toThrow("Campos faltando");

        expect(findAllProdutoHasVendaDireta.execute({idVendaDireta: 3})).resolves.toHaveLength(0);
    })
})