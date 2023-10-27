import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { DelProdutoHasVendaDiretaUC } from "./DelProdutoHasVendaDiretaUC";

describe("Del ProdutoHasVendaDireta", () => {
    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const delProdutoHasVendaDiretaUC = new DelProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    mySqlProdutoHasVendaDireta.items = [
        {
            codigoBarras: "1",
            idVendaDireta: 1,
            quantidadeVendida: 2,
            precoTotal: 30,
            precoUnitario: 15
        },
        {
            codigoBarras: "2",
            idVendaDireta: 2,
            quantidadeVendida: 3,
            precoTotal: 60,
            precoUnitario: 20
        }
    ];

    it("should be able to delete a ProdutoHasVendaDireta", () => {
        expect(delProdutoHasVendaDiretaUC.execute({codigoBarras: "2", idVendaDireta: 2}).then(() => {
            expect(mySqlProdutoHasVendaDireta.items.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras == "2" && produtoHasVendaDireta.idVendaDireta == 2) {
                    return produtoHasVendaDireta;
                }
            })).toBe(undefined);
        })).resolves;
    });

    it("should not be able to delete a ProdutoHasVendaDireta", () => {
        expect(delProdutoHasVendaDiretaUC.execute({codigoBarras: "", idVendaDireta: 2})).rejects.toThrow("Campos faltando");
        expect(delProdutoHasVendaDiretaUC.execute({codigoBarras: "2", idVendaDireta: null})).rejects.toThrow("Campos faltando");
        
    })
});