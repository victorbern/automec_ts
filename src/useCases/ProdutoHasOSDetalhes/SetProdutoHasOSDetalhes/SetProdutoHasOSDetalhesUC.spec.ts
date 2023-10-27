import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { SetProdutoHasOSDetalhesUC } from "./SetProdutoHasOSDetalhesUC";

describe("Set ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const setProdutoHasOSDetalhesUC = new SetProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    mySqlProdutoHasOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            codigoBarras: "1",
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30,
        },
        {
            idOSDetalhes: 1,
            codigoBarras: "2",
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30
        }
    ];

    it("should be able to set a ProdutoHasOSDetalhes", () => {
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 1, codigoBarras: "1", quantidadeVendida: 3, precoTotal: 90, precoUnitario: 30}).then(() => {
            const produtoHasOSDetalhes = mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.idOSDetalhes == 1 && produtoHasOSDetalhes.codigoBarras == "1") {
                    return produtoHasOSDetalhes;
                }
            })

            expect(produtoHasOSDetalhes.quantidadeVendida).toBe(3);
            expect(produtoHasOSDetalhes.precoTotal).toBe(90);
            expect(produtoHasOSDetalhes.precoUnitario).toBe(30);
        })).resolves;
    });


    it("should not be able to set a ProdutoHasOSDetalhes", () => {
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: null, codigoBarras: "1", quantidadeVendida: 3, precoTotal: 90, precoUnitario: 30})).rejects.toThrow("Campos faltando");
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 1, codigoBarras: null, quantidadeVendida: 3, precoTotal: 90, precoUnitario: 30})).rejects.toThrow("Campos faltando");
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 1, codigoBarras: "1", quantidadeVendida: null, precoTotal: 90, precoUnitario: 30})).rejects.toThrow("Campos faltando");
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 1, codigoBarras: "1", quantidadeVendida: 3, precoTotal: null, precoUnitario: 30})).rejects.toThrow("Campos faltando");
        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 1, codigoBarras: "1", quantidadeVendida: 3, precoTotal: 90, precoUnitario: null})).rejects.toThrow("Campos faltando");

        expect(setProdutoHasOSDetalhesUC.execute({idOSDetalhes: 3, codigoBarras: "1", quantidadeVendida: 3, precoTotal: 90, precoUnitario: 30})).rejects.toThrow("A venda a ser alterada não foi encontrada");

    })
})