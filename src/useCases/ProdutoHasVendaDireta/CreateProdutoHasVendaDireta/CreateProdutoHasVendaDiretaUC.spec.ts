import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { CreateProdutoHasVendaDiretaUC } from "./CreateProdutoHasVendaDiretaUC";

describe("Create ProdutoHasVendaDireta", () => {
    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const createProdutoHasVendaDiretaUC = new CreateProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

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
            precoTotal: 90,
            precoUnitario: 30,
        }
    ];

    it("should be able to create a ProdutoHasVendaDireta", () => {
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "3", idVendaDireta: 3, quantidadeVendida: 3, precoTotal: 60, precoUnitario: 20}).then(() => {
            const produtoHasVendaDireta = mySqlProdutoHasVendaDireta.items.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras == "3" && produtoHasVendaDireta.idVendaDireta == 3) {
                    return produtoHasVendaDireta;
                }
            });

            expect(produtoHasVendaDireta.precoTotal).toBe(60);
            expect(produtoHasVendaDireta.precoUnitario).toBe(20);
            expect(produtoHasVendaDireta.quantidadeVendida).toBe(3);
        }));
    });

    it("should not be able to create a ProdutoHasVendaDireta", () => {
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "", idVendaDireta: 3, quantidadeVendida: 3, precoTotal: 60, precoUnitario: 20})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "3", idVendaDireta: null, quantidadeVendida: 3, precoTotal: 60, precoUnitario: 20})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "3", idVendaDireta: 3, quantidadeVendida: null, precoTotal: 60, precoUnitario: 20})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "3", idVendaDireta: 3, quantidadeVendida: 3, precoTotal: null, precoUnitario: 20})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasVendaDiretaUC.execute({codigoBarras: "3", idVendaDireta: 3, quantidadeVendida: 3, precoTotal: 60, precoUnitario: null})).rejects.toThrow("Campos faltando");

    })
})